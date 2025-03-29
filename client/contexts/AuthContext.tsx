import React, { createContext, useContext, useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
import { AUTH0_CONFIG, AUTH0_SCOPES } from '../config/auth0';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Get the redirect URL based on the platform and environment
const getRedirectUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:19006/callback';
  }
  
  // For development in Expo Go using your specific IP
  const redirectUri = `exp://10.25.12.190:19000/--/callback`;
  
  console.log('Generated Redirect URI:', redirectUri);
  return redirectUri;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const redirectUri = getRedirectUrl();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: AUTH0_CONFIG.clientId,
      redirectUri,
      responseType: ResponseType.Code,
      scopes: AUTH0_SCOPES,
      extraParams: {
        nonce: 'nonce'
      },
    },
    {
      authorizationEndpoint: `https://${AUTH0_CONFIG.domain}/authorize`,
      tokenEndpoint: `https://${AUTH0_CONFIG.domain}/oauth/token`,
    }
  );

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      // Here you would typically exchange the code for tokens
      // For now, we'll just set a mock user
      setUser({ id: '1', name: 'Test User' });
    } else if (response?.type === 'error') {
      console.error('Auth response error:', response.error);
    }
  }, [response]);

  const checkSession = async () => {
    try {
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking session:', error);
      setIsLoading(false);
    }
  };

  const signIn = async () => {
    try {
      console.log('Starting auth with redirect URI:', redirectUri);
      const result = await promptAsync();
      console.log('Auth result:', result);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
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