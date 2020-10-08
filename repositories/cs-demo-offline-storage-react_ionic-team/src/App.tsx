import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import TeaCategories from './categories/TeaCategories';
import TeaCategoryEditor from './editor/TeaCategoryEditor';
import TeaProvider from './hooks/useTeaContext';

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
import './theme/variables.css';

const App: React.FC = () => {
  return (
    <IonApp>
      <TeaProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/categories" component={TeaCategories} exact={true} />
            <Route path="/categories/add" component={TeaCategoryEditor} exact={true} />
            <Route path="/categories/:id" component={TeaCategoryEditor} />
            <Route exact path="/" render={() => <Redirect to="/categories" />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </TeaProvider>
    </IonApp>
  );
};

export default App;
