import React from 'react';
import GoogleMapReact, { Coords } from 'google-map-react';
import './MapWithEvents.scss';
import { IEvent } from '../service/events';
import { IonIcon } from '@ionic/react';
import { headsetOutline } from 'ionicons/icons';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '';

const EventMapMarker: React.FC<{ event: IEvent; lat: number; lng: number }> = ({ event }) => {
    return (
        <div className="markerWrapper">
            <IonIcon color="light" icon={headsetOutline}></IonIcon>
        </div>
    );
};

interface IEventsMapProps {
    events: IEvent[];
    openEventCard: (event: IEvent) => any;
    closeEventCard: () => any;
    center: Coords;
    zoom: number;
}

const MapWithEvents: React.FC<IEventsMapProps> = ({ events, center, zoom, closeEventCard, openEventCard }) => {
    return (
        <GoogleMapReact
            onClick={closeEventCard}
            onChildClick={(key, child) => {
                openEventCard(child.event);
            }}
            bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
            defaultCenter={center}
            zoom={zoom}
            options={{ fullscreenControl: false }}
        >
            {events.map((ev) => (
                <EventMapMarker key={ev.name} lat={ev.location.lat!} lng={ev.location.lng!} event={ev}></EventMapMarker>
            ))}
        </GoogleMapReact>
    );
};

export default MapWithEvents;
