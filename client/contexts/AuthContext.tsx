import React, { createContext, useContext, useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, ResponseType, Prompt } from 'expo-auth-session';
import { AUTH0_CONFIG, AUTH0_SCOPES, REDIRECT_URIS } from '../config/auth0';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import * as Network from 'expo-network';

WebBrowser.maybeCompleteAuthSession();

interface User {
  sub: string;
  email?: string;
  name?: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Get the redirect URL based on the platform and environment
const getRedirectUrl = async () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:8081/callback';
  }

  // Get the device's IP address for development
  const ip = await Network.getIpAddressAsync();
  const redirectUri = makeRedirectUri({
    scheme: 'exp',
    path: 'callback',
    preferLocalhost: true,
  });
  
  console.log('Generated Redirect URI:', redirectUri);
  return redirectUri;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [redirectUri, setRedirectUri] = useState<string>('');

  useEffect(() => {
    const initializeRedirectUri = async () => {
      const uri = await getRedirectUrl();
      setRedirectUri(uri);
      setIsLoading(false);
    };

    initializeRedirectUri();
  }, []);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: AUTH0_CONFIG.clientId,
      redirectUri: redirectUri,
      responseType: ResponseType.Code,
      scopes: AUTH0_SCOPES,
      extraParams: {
        nonce: 'nonce',
        prompt: Prompt.Login,
      },
    },
    {
      authorizationEndpoint: `https://${AUTH0_CONFIG.domain}/authorize`,
      tokenEndpoint: `https://${AUTH0_CONFIG.domain}/oauth/token`,
      revocationEndpoint: `https://${AUTH0_CONFIG.domain}/oauth/revoke`,
    }
  );

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await fetch(`https://${AUTH0_CONFIG.domain}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          client_id: AUTH0_CONFIG.clientId,
          client_secret: AUTH0_CONFIG.clientSecret,
          code,
          redirect_uri: redirectUri,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Token exchange error:', errorData);
        throw new Error('Failed to exchange code for token');
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  };

  const fetchUserInfo = async (accessToken: string) => {
    try {
      const response = await fetch(`https://${AUTH0_CONFIG.domain}/userinfo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      const userInfo = await response.json();
      return userInfo;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      handleAuthenticationSuccess(code);
    } else if (response?.type === 'error') {
      console.error('Auth response error:', response.error);
    }
  }, [response]);

  const handleAuthenticationSuccess = async (code: string) => {
    try {
      const accessToken = await exchangeCodeForToken(code);
      const userInfo = await fetchUserInfo(accessToken);
      setUser(userInfo);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error handling authentication:', error);
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

  const signOut = async () => {
    try {
      setUser(null);
      router.replace('/');
      
      const logoutUrl = `https://${AUTH0_CONFIG.domain}/v2/logout?client_id=${AUTH0_CONFIG.clientId}&returnTo=${encodeURIComponent(redirectUri)}`;
      if (Platform.OS === 'web') {
        window.location.href = logoutUrl;
      } else {
        await WebBrowser.openBrowserAsync(logoutUrl);
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return null;
  }

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