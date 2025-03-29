import React, { createContext, useContext, useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
import { AUTH0_CONFIG, AUTH0_SCOPES } from '../config/auth0';
import { Platform } from 'react-native';
import { router } from 'expo-router';

// Initialize WebBrowser for auth session
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
  handleCallback: (code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRouterReady, setIsRouterReady] = useState(false);

  // Pre-define a valid redirect URI
  const redirectUri = Platform.OS === 'web' 
    ? 'http://localhost:8081/callback'
    : makeRedirectUri({
        scheme: 'exp',
        path: 'callback',
      });
  
  console.log('Using redirectUri:', redirectUri);

  // Configure Auth0 endpoints
  const authConfig = {
    authorizationEndpoint: `https://${AUTH0_CONFIG.domain}/authorize`,
    tokenEndpoint: `https://${AUTH0_CONFIG.domain}/oauth/token`,
    revocationEndpoint: `https://${AUTH0_CONFIG.domain}/oauth/revoke`,
  };

  // Set up authentication request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: AUTH0_CONFIG.clientId,
      redirectUri,
      responseType: ResponseType.Code,
      scopes: AUTH0_SCOPES,
      extraParams: {
        nonce: 'nonce',
      },
    },
    authConfig
  );

  // Exchange authorization code for access token
  const exchangeCodeForToken = async (code: string) => {
    try {
      console.log('Exchanging code for token...');
      const tokenResponse = await fetch(`https://${AUTH0_CONFIG.domain}/oauth/token`, {
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

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        console.error('Token exchange error:', errorData);
        throw new Error('Failed to exchange code for token');
      }

      const data = await tokenResponse.json();
      console.log('Token received successfully');
      return data.access_token;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  };

  // Fetch user information using access token
  const fetchUserInfo = async (accessToken: string) => {
    try {
      console.log('Fetching user info...');
      const userInfoResponse = await fetch(`https://${AUTH0_CONFIG.domain}/userinfo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!userInfoResponse.ok) {
        throw new Error('Failed to fetch user info');
      }

      const userInfo = await userInfoResponse.json();
      console.log('User info received:', userInfo);
      return userInfo;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  };

  // Wait for router to be ready
  useEffect(() => {
    // This will run after the component is mounted fully
    setIsRouterReady(true);
  }, []);

  // Handle authentication response from expo-auth-session
  useEffect(() => {
    if (response?.type === 'success' && isRouterReady) {
      console.log('Auth response success, processing code...');
      const { code } = response.params;
      handleAuthenticationSuccess(code);
    } else if (response?.type === 'error') {
      console.error('Auth response error:', response.error);
    }
  }, [response, isRouterReady]);

  // This is called from the callback page
  const handleCallback = async (code: string) => {
    if (code) {
      console.log('Processing auth code from callback page');
      await handleAuthenticationSuccess(code);
    }
  };

  // Process authentication success
  const handleAuthenticationSuccess = async (code: string) => {
    try {
      setIsLoading(true);
      const accessToken = await exchangeCodeForToken(code);
      const userInfo = await fetchUserInfo(accessToken);
      setUser(userInfo);
      
      // Wait until the next tick to ensure the navigator is ready
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 300);
    } catch (error) {
      console.error('Error handling authentication:', error);
      
      // Wait until the next tick to ensure the navigator is ready
      setTimeout(() => {
        router.replace('/');
      }, 300);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in function
  const signIn = async () => {
    try {
      console.log('Starting auth with redirect URI:', redirectUri);
      
      // For web, directly redirect to Auth0
      if (Platform.OS === 'web') {
        const authUrl = new URL(authConfig.authorizationEndpoint);
        authUrl.searchParams.append('client_id', AUTH0_CONFIG.clientId);
        authUrl.searchParams.append('redirect_uri', redirectUri);
        authUrl.searchParams.append('response_type', 'code');
        authUrl.searchParams.append('scope', AUTH0_SCOPES.join(' '));
        authUrl.searchParams.append('nonce', 'nonce');
        
        window.location.href = authUrl.toString();
        return;
      }
      
      // For mobile, use the expo-auth-session flow
      const result = await promptAsync();
      console.log('Auth result:', result);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      setUser(null);
      
      // Redirect to Auth0 logout
      const returnTo = encodeURIComponent('http://localhost:8081');
      const logoutUrl = `https://${AUTH0_CONFIG.domain}/v2/logout?client_id=${AUTH0_CONFIG.clientId}&returnTo=${returnTo}`;
      
      if (Platform.OS === 'web') {
        window.location.href = logoutUrl;
      } else {
        await WebBrowser.openBrowserAsync(logoutUrl);
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, handleCallback }}>
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