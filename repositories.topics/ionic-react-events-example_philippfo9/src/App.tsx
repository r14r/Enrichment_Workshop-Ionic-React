import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { personOutline, mapOutline, listOutline } from 'ionicons/icons';
import UserHome from './pages/UserHome';
import EventList from './pages/EventList';
import EventMap from './pages/EventMap';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';

/* Common css utility classes */
import './theme/common.scss';

import UserContext from './service/userContext';
import EventDetailPage from './pages/EventDetailPage';

const App: React.FC = () => {
    const [user, setUser] = useState({
        name: 'Gustav',
        email: 'gustavo@diblo.at',
    });
    return (
        <IonApp>
            <IonReactRouter>
                <UserContext.Provider value={user}>
                    <IonTabs>
                        <IonRouterOutlet>
                            <Route path="/profile" component={UserHome} exact={true} />
                            <Route path="/events-list" component={EventList} exact={true} />
                            <Route path="/events-map" component={EventMap} />
                            <Route path="/events/:name" component={EventDetailPage} />
                            <Route path="/" render={() => <Redirect to="/profile" />} exact={true} />
                        </IonRouterOutlet>
                        <IonTabBar slot="bottom">
                            <IonTabButton tab="profile" href="/profile">
                                <IonIcon icon={personOutline} />
                            </IonTabButton>
                            <IonTabButton tab="eventList" href="/events-list">
                                <IonIcon icon={listOutline} />
                            </IonTabButton>
                            <IonTabButton tab="eventsMap" href="/events-map">
                                <IonIcon icon={mapOutline} />
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                </UserContext.Provider>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
