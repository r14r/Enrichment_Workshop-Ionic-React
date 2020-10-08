import React from 'react';
import './MapEventCard.scss';
import { IonCol } from '@ionic/react';
import EventCard from './EventCard';
import { IEvent } from '../service/events';

const MapEventCard: React.FC<{ event: IEvent }> = ({ event }) => {
    return (
        <IonCol size="24" sizeMd="8" sizeXl="6">
            <EventCard cardClassNames="ion-no-margin ion-margin-horizontal" event={event}></EventCard>
        </IonCol>
    );
};

export default MapEventCard;
