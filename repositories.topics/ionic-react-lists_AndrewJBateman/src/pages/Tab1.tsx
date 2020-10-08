import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent } from '@ionic/react';
import './Tab1.css';
import AddItem from '../AddItem';
import ItemList from '../itemList';

// anonymous function returning template code
const Tab1: React.FC = () => {

  const [current, setCurrent] = useState(null);

  return (
    <IonPage>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <h3>Group List of Tasks:</h3>            
          </IonCardHeader>
          <IonCardContent>
            <AddItem initialValue={current} clear={() => setCurrent(null)} />
          </IonCardContent>
          {}
          <ItemList doEdit={setCurrent} />
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
