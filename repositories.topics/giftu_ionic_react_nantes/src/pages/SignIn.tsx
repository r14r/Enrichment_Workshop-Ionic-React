import {
  IonCard,
  /* IonCardContent, */
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonNote,
  IonFab,
  IonFabButton
} from '@ionic/react';
import { logoFacebook,help } from 'ionicons/icons';
import React from 'react';
import './SignIn.css';
import { RouteComponentProps } from 'react-router';

const SignIn: React.FC<RouteComponentProps> = (props) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SignIn</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
    <IonList>
      <IonItem onClick={() => props.history.push('/faq')}>
        <IonLabel>
          <h1>Facebook Login</h1>
          <IonNote>Login with Facebook</IonNote>
        </IonLabel>
        <IonIcon icon={logoFacebook} slot="end">
          5 Days
        </IonIcon>
      </IonItem>
    </IonList>
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton>
        <IonFabButton onClick={() => props.history.push('/faq')}>
          <IonIcon icon={help} />
        </IonFabButton>
      </IonFabButton>
    </IonFab>
  </IonContent>
    </IonPage>
  );
};

export default SignIn;
