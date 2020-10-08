import { isPlatform } from '@ionic/react';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';

const options: IonicAuthOptions = {
  authConfig: 'auth0',
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID!,
  discoveryUrl: process.env.REACT_APP_AUTH0_DISCOVERY_URL!,
  scope: process.env.REACT_APP_AUTH0_SCOPE!,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE!,
  redirectUri:
    (isPlatform('capacitor')
      ? process.env.REACT_APP_APPHOST
      : process.env.REACT_APP_WEBHOST) + 'login',
  logoutUrl:
    (isPlatform('capacitor')
      ? process.env.REACT_APP_APPHOST
      : process.env.REACT_APP_WEBHOST) + 'login',
  platform: isPlatform('capacitor') ? 'capacitor' : 'web',
  iosWebView: 'private',
  logLevel: 'DEBUG',
};

export class Auth0Service extends IonicAuth {
  async onLoginSuccess(): Promise<void> {
    console.log('👤 Auth0:\tSuccessfully logged in.');
  }

  async onLogout(): Promise<void> {
    console.log('👤 Auth0:\tSuccessfully logged out.');
  }
}

export default new Auth0Service(options);
