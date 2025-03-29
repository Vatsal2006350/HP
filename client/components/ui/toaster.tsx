import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Toaster() {
  return (
    <View style={styles.container}>
      {/* Toast messages will be rendered here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 100,
  },
}); 