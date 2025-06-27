import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const GlassmorphicCard = () => {
  return (
    <View style={styles.container}>
      <BlurView
        style={StyleSheet.absoluteFill}
        intensity={13}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Glass Effect</Text>
        <Text style={styles.description}>This is a glassmorphic card in React Native.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 150,
    borderRadius: 15,
    overflow: 'hidden', // Important for blur to be clipped
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, // For Android shadows
    backgroundColor: '#2D3037', // Semi-transparent background
    opacity: 0.7
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  title: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});

export default GlassmorphicCard;