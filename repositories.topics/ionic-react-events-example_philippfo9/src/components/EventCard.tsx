import React from 'react';
import { IEvent, formatEventDate } from '../service/events';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonText } from '@ionic/react';

const EventCard: React.FC<{ event: IEvent; cardClassNames?: string }> = (props) => {
    const event = props.event;
    const eventRouterLink = `/events/${event.name}`;
    return (
        <IonCard routerLink={eventRouterLink} className={props.cardClassNames}>
            <img src={event.titlePic} alt={event.name} />
            <IonCardHeader>
                <IonCardSubtitle>{event.location.name}</IonCardSubtitle>
                <IonCardTitle>{event.name}</IonCardTitle>
                <div>
                    <IonText color="primary" style={{ fontWeight: '700', marginTop: '4px' }}>
                        {formatEventDate(event)}
                    </IonText>
                </div>
            </IonCardHeader>
            {props.children && <IonCardContent>{props.children}</IonCardContent>}
        </IonCard>
    );
};

export default EventCard;
