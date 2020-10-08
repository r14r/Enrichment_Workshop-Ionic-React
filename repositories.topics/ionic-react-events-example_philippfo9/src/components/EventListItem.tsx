import React from 'react';
import { IEvent, formatEventDate } from '../service/events';
import { IonCol, IonText } from '@ionic/react';
import EventCard from './EventCard';

const EventListItem: React.FC<{ event: IEvent }> = ({ event }) => {
    return (
        <IonCol size="24" sizeMd="8" sizeLg="6">
            <EventCard event={event}>
                <div>
                    <IonText style={{ fontSize: '0.8rem', fontWeight: '800' }}>In {event.distance} km Distanz</IonText>
                </div>
                <div>
                    <span className="preview-text">{event.description}</span>
                </div>
            </EventCard>
        </IonCol>
    );
};

export default EventListItem;
