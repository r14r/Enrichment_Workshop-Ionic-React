import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import {
  IonPage,
  IonContent,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonFooter,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonIcon
} from '@ionic/react';
import { warning } from 'ionicons/icons';

import { useTeaContext } from '../hooks/useTeaContext';

import './TeaCategoryEditor.css';

interface TeaCategoryEditorProps
  extends RouteComponentProps<{
    id?: string;
  }> {}

const TeaCategoryEditor: React.FC<TeaCategoryEditorProps> = ({
  match: {
    params: { id }
  },
  history
}) => {
  const { getTeaCategory, saveTeaCategory } = useTeaContext();
  const { control, handleSubmit, errors, formState, reset } = useForm({
    defaultValues: { name: '', description: '' },
    mode: 'onChange'
  });

  useEffect(() => {
    if (id) {
      const { name, description } = getTeaCategory(parseInt(id, 10));
      reset({ name, description });
    }
  }, [id]);

  const onSubmit = async (data: any) => {
    id && (data.id = id);
    await saveTeaCategory(data);
    history.goBack();
  };

  const showError = (fieldName: string) => {
    let error = (errors as any)[fieldName];
    return error ? (
      <div className="error">
        <IonIcon icon={warning} /> &nbsp;
        {error.message || `${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)} cannot be empty`}
      </div>
    ) : null;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/categories" />
          </IonButtons>
          <IonTitle>{id ? 'Edit' : 'Add New'} Tea Category</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form>
          <IonList className="tea-category-editor-form">
            <IonItem>
              <IonLabel position="floating">Name</IonLabel>
              <Controller
                as={IonInput}
                control={control}
                onChangeName="onIonChange"
                onChange={([e]) => e.detail.value!}
                name="name"
                rules={{
                  required: true,
                  minLength: { value: 4, message: 'Name must be at least 4 characters long' }
                }}
              />
            </IonItem>
            {showError('name')}
            <IonItem>
              <IonLabel position="floating">Description</IonLabel>
              <Controller
                as={IonTextarea}
                rows={5}
                control={control}
                onChangeName="onIonChange"
                onChange={([e]) => e.detail.value!}
                name="description"
                rules={{ required: true }}
              />
            </IonItem>
            {showError('description')}
          </IonList>
        </form>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton expand="full" type="submit" disabled={!formState.dirty} onClick={handleSubmit(onSubmit)}>
            Save
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
export default TeaCategoryEditor;
