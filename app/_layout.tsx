import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../contexts/AuthContext';
import { useAuth } from '../contexts/AuthContext';
import SignInScreen from '../components/SignInScreen';

function RootLayoutNav() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or a loading screen
  }

  if (!user) {
    return <SignInScreen />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      {/* Add other screens here */}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <RootLayoutNav />
    </AuthProvider>
  );
}
