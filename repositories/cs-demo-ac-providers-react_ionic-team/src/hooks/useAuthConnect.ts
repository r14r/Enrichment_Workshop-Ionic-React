import { useState, useEffect } from 'react';
import { IonicAuth } from '@ionic-enterprise/auth';

export const useAuthConnect = (auth: IonicAuth) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const authenticationStatus = await auth.isAuthenticated();
      setIsAuthenticated(authenticationStatus);
    };
    init();
  }, [auth]);

  const login = async (): Promise<void> => {
    try {
      await auth.login();
      setIsAuthenticated(true);
    } catch (error) {
      console.log('Could not log in.', error);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await auth.logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Could not log out.', error);
    }
  };

  const refresh = async (): Promise<void> => {
    const authenticationStatus = await auth.isAuthenticated();
    setIsAuthenticated(authenticationStatus);
  };

  return { isAuthenticated, login, logout, refresh };
};
