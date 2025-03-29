import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function CallbackPage() {
  const { handleCallback } = useAuth();

  useEffect(() => {
    // Extract the auth code from the URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      
      if (code) {
        console.log('Auth code detected in callback page');
        // Clean the URL
        window.history.replaceState({}, document.title, '/callback');
        
        // Process the authentication code
        handleCallback(code);
      }
    }
  }, [handleCallback]);

  return (
    <>
      <Stack.Screen options={{ title: 'Authenticating' }} />
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4c1d95" />
        <Text style={styles.text}>Completing authentication...</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#4c1d95',
  },
}); 