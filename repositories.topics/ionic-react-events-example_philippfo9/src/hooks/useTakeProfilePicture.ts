import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import {
    CameraResultType,
    CameraSource,
    CameraPhoto,
    FilesystemDirectory,
    Capacitor,
    FileReadOptions,
    FileReadResult,
    FileWriteResult,
} from '@capacitor/core';
import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

export interface Photo {
    filepath: string;
    webviewPath?: string;
    base64?: string;
}

const PROFILE_PICTURE_STORAGE = 'photos';

export function useTakeProfilePicture() {
    const [profilePicture, setProfilePicture] = useState<Photo>();
    const { get, set, remove } = useStorage();
    const { deleteFile, getUri, readFile, writeFile } = useFilesystem();
    const { getPhoto } = useCamera();

    //TODO: moving this savePhoto function out
    const savePhoto = async (photo: CameraPhoto, fileName: string): Promise<Photo> => {
        const savedFile = await writeFile({
            path: fileName,
            data: await getBase64DataFromPhoto(photo, readFile),
            directory: FilesystemDirectory.Data,
        });

        return photoFromSavedFile({ photo, fileName, savedFile });
    };

    const deletePhoto = async (photo: Photo) => {
        remove(PROFILE_PICTURE_STORAGE);

        const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
        await deleteFile({
            path: filename,
            directory: FilesystemDirectory.Data,
        });

        setProfilePicture(undefined);
    };

    useEffect(() => {
        const loadSaved = async () => {
            const profilePicString = await get(PROFILE_PICTURE_STORAGE);
            const profilePictureInStorage = (profilePicString && JSON.parse(profilePicString)) as Photo | undefined;
            if (!profilePictureInStorage?.webviewPath) return;
            if (!isPlatform('hybrid')) {
                const photoFile = await readFile({
                    path: profilePictureInStorage.filepath,
                    directory: FilesystemDirectory.Data,
                });
                profilePictureInStorage.base64 = `data:image/jpeg;base64,${photoFile.data}`;
            }
            setProfilePicture(profilePictureInStorage);
        };
        loadSaved();
    }, [get, readFile]);

    const takeProfilePicture = async () => {
        const cameraPhoto = await getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });
        const fileName = new Date().getTime() + '.jpeg';
        const newPhoto: Photo = await savePhoto(cameraPhoto, fileName);
        setProfilePicture(newPhoto);
        set(PROFILE_PICTURE_STORAGE, stringifyPhotoForStorage(newPhoto));
    };

    return {
        profilePicture,
        takeProfilePicture,
        deleteProfilePicture: deletePhoto,
    };
}

// TODO: strong usage of isPlatform is weird?
async function getBase64DataFromPhoto(photo: CameraPhoto, readFile: (options: FileReadOptions) => Promise<FileReadResult>): Promise<string> {
    if (isPlatform('hybrid')) {
        const file = await readFile({
            path: photo.path!,
        });
        return file.data;
    } else {
        return base64FromPath(photo.webPath!);
    }
}

// TODO: construct it here?
function photoFromSavedFile({ photo, fileName, savedFile }: { photo: CameraPhoto; fileName: string; savedFile: FileWriteResult }): Photo {
    if (isPlatform('hybrid')) {
        return {
            filepath: savedFile.uri,
            webviewPath: Capacitor.convertFileSrc(savedFile.uri),
        };
    } else {
        return {
            filepath: fileName,
            webviewPath: photo.webPath,
        };
    }
}

function stringifyPhotoForStorage(photo: Photo) {
    return isPlatform('hybrid') ? JSON.stringify(photo) : JSON.stringify(copyPhoto(photo));
}

function copyPhoto(newPhoto: Photo) {
    const photoCopy = { ...newPhoto };
    delete photoCopy.base64;
    return photoCopy;
}
