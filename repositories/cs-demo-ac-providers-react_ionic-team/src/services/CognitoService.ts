import { isPlatform } from '@ionic/react';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';

const options: IonicAuthOptions = {
  authConfig: 'cognito',
  clientID: process.env.REACT_APP_COGNITO_CLIENT_ID!,
  clientSecret: process.env.REACT_APP_COGNITO_CLIENT_SECRET!,
  discoveryUrl: process.env.REACT_APP_COGNITO_DISCOVERY_URL!,
  scope: process.env.REACT_APP_COGNITO_SCOPE!,
  audience: process.env.REACT_APP_COGNITO_AUDIENCE!,
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

export class CognitoService extends IonicAuth {
  async onLoginSuccess(): Promise<void> {
    console.log('👤 AWS Cognito:\tSuccessfully logged in.');
  }

  async onLogout(): Promise<void> {
    console.log('👤 AWS Cognito:\tSuccessfully logged out.');
  }
}

export default new CognitoService(options);
