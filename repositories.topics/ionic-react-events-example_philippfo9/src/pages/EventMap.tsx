import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './EventMap.scss';
import MapWithEvents from '../components/MapWithEvents';
import events, { IEvent } from '../service/events';
import MapEventCard from '../components/MapEventCard';

const EventMapPage: React.FC = () => {
    const [eventForDetailView, setEventForDetailView] = useState<IEvent>();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Finde Events in deiner Nähe</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="eventMapContent">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Finde Events in deiner Nähe</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div style={{ flex: 1 }}>
                    <MapWithEvents
                        closeEventCard={() => {
                            setEventForDetailView(undefined);
                        }}
                        openEventCard={(event) => {
                            setEventForDetailView(event);
                        }}
                        center={{ lat: 48.210033, lng: 16.363449 }}
                        events={events}
                        zoom={13}
                    ></MapWithEvents>
                </div>
                {eventForDetailView && (
                    <div className="mapEventCard">
                        <MapEventCard event={eventForDetailView}></MapEventCard>
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default EventMapPage;
