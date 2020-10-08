import React, { useState } from 'react';
import { IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonLabel, IonButton } from '@ionic/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import './AuthProvider.css';

export interface AuthProviderProps {
  name: string;
  color: string;
  icon: IconDefinition;
  hook: {
    isAuthenticated: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
  };
}

const AuthProvider: React.FC<{ provider: AuthProviderProps }> = ({
  provider: {
    name,
    color,
    icon,
    hook: { isAuthenticated, login, logout, refresh }
  }
}) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const isLight = (color: string): boolean => {
    switch (color) {
      case 'primary':
      case 'tertiary':
      case 'danger':
      case 'dark':
        return false;
      default:
        return true;
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const handleButton = async () => {
    if (isAuthenticated) return logout();
    return login();
  };

  return (
    <IonCard color={color} className='provider'>
      <IonCardHeader>
        <IonCardTitle className='provider__title'>
          <FontAwesomeIcon className='provider__title-icon' icon={icon} />
          {name}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent className='provider__content'>
        <IonLabel className='provider__label'>
          Status:
          <span className='provider__status'>{isAuthenticated ? 'Logged In' : 'Logged Out'}</span>
          <span className='provider__spacer'></span>
          <IonButton color={color} onClick={handleRefresh}>
            <FontAwesomeIcon spin={refreshing} icon={faSync} />
          </IonButton>
        </IonLabel>
        <div className='provider__actions'>
          <IonButton color={isLight(color) ? 'dark' : 'light'} fill='outline' onClick={handleButton}>
            {isAuthenticated ? ' Log Out' : 'Log In'}
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};
export default AuthProvider;
