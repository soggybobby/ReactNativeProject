import React from 'react';
import { View, Text, Button, Image, ScrollView, StyleSheet, Alert } from 'react-native';

const ComponentShowcase = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Component Showcase</Text>

      <Text style={styles.section}>This is a Text component!</Text>

      <Button
        title="Press Me"
        onPress={() => Alert.alert('Button Pressed!', 'You clicked the button.')}
      />

      <Text style={styles.section}>Image Component</Text>
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={styles.image}
        resizeMode="contain"
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    fontSize: 18,
    marginVertical: 15,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});

export default ComponentShowcase;
