import React, { useContext, useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonFab,
    IonFabButton,
    IonIcon,
    IonText,
    IonCol,
    IonActionSheet,
} from '@ionic/react';
import './UserHome.scss';
import UserContext from '../service/userContext';
import { useTakeProfilePicture } from '../hooks/useTakeProfilePicture';
import { camera, close, trash } from 'ionicons/icons';

const ProfilePage: React.FC = () => {
    const user = useContext(UserContext);
    const { profilePicture, takeProfilePicture, deleteProfilePicture } = useTakeProfilePicture();
    const [photoClicked, setPhotoClicked] = useState<boolean>(false);

    const takeProfilePictureClicked = () => {
        takeProfilePicture();
    };

    const profilePictureClicked = () => {
        setPhotoClicked(true);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Welcome {user.name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Welcome {user.name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid>
                    {!profilePicture && (
                        <IonRow>
                            <IonText>You have no profile picture yet. Take one!</IonText>
                        </IonRow>
                    )}
                    {profilePicture && (
                        <IonRow>
                            <IonCol size="24">
                                <img
                                    src={profilePicture.base64 ?? profilePicture.webviewPath}
                                    alt="profilePicture"
                                    onClick={profilePictureClicked}
                                ></img>
                            </IonCol>
                        </IonRow>
                    )}
                </IonGrid>
                <IonFab vertical="bottom" horizontal="center">
                    <IonFabButton onClick={takeProfilePictureClicked}>
                        <IonIcon icon={camera}></IonIcon>
                    </IonFabButton>
                </IonFab>
                <IonActionSheet
                    isOpen={!!photoClicked}
                    buttons={[
                        {
                            text: 'Delete',
                            role: 'destructive',
                            icon: trash,
                            handler: () => {
                                if (photoClicked && profilePicture) {
                                    deleteProfilePicture(profilePicture);
                                    setPhotoClicked(false);
                                }
                            },
                        },
                        {
                            text: 'Cancel',
                            icon: close,
                            role: 'cancel',
                        },
                    ]}
                    onDidDismiss={() => setPhotoClicked(false)}
                />
            </IonContent>
        </IonPage>
    );
};

export default ProfilePage;
