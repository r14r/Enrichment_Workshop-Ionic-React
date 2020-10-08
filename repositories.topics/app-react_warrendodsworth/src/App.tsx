import './App.css';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';

import { IonApp } from '@ionic/react';
import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router';

import Home from './components/Tabs';
import history from './history';

class App extends Component {
  render() {
    return (
      <IonApp>
        <Router history={history}>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </IonApp>
    )
  }
}

export default App

