// App.tsx
import React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ComponentShowcase from './ComponentShowcase';

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <SafeAreaView style={styles.center}>
    <Text style={styles.text}>Hello, Gester A. Samson!</Text>
  </SafeAreaView>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Showcase" component={ComponentShowcase} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
