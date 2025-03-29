import React, { createContext, useContext, useState, useEffect } from 'react';
import Auth0 from 'react-native-auth0';
import { AUTH0_CONFIG } from '../config/auth0';

type AuthContextType = {
  isAuthenticated: boolean;
  user: any | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
};

const auth0 = new Auth0({
  domain: AUTH0_CONFIG.domain,
  clientId: AUTH0_CONFIG.clientId,
});

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const credentials = await auth0.credentialsManager.getCredentials();
      if (credentials) {
        const userInfo = await auth0.auth.userInfo({ token: credentials.accessToken });
        setIsAuthenticated(true);
        setUser(userInfo);
      }
    } catch (error) {
      console.log('No stored credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
      });
      
      await auth0.credentialsManager.saveCredentials(credentials);
      const userInfo = await auth0.auth.userInfo({ token: credentials.accessToken });
      
      setIsAuthenticated(true);
      setUser(userInfo);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signOut = async () => {
    try {
      await auth0.webAuth.clearSession();
      await auth0.credentialsManager.clearCredentials();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 