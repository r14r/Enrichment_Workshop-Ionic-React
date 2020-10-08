import React from 'react';
import { useParams } from 'react-router';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonGrid } from '@ionic/react';

const EventDetailPage: React.FC = () => {
    const { name } = useParams();
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid></IonGrid>
            </IonContent>
        </IonPage>
    );
};
export default EventDetailPage;
