import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow } from '@ionic/react';
import './EventList.scss';
import events from '../service/events';
import EventListItem from '../components/EventListItem';

const EventListPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Finde Events in deiner Nähe</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Finde Events in deiner Nähe</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid>
                    <IonRow>
                        {events.map((event) => (
                            <EventListItem key={event.name} event={event}></EventListItem>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default EventListPage;
