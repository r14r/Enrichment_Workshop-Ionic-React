import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import Game  from './Game';

import React from 'react';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tic-Tac-Toe</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
          <Game />
      </IonContent>
    </IonPage>
  );
};

export default Home;
