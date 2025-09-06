
import React from "react";
import { Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ComponentShowcase from "./ComponentShowcase";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import PlaylistsScreen from "./PlaylistsScreen";
import AppNavigation from "./AppNavigation";
import AppStyles from "./AppStyles";

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <SafeAreaView style={AppStyles.center}>
    <Text style={AppStyles.text}>Hello, Gester A. Samson!</Text>
  </SafeAreaView>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Showcase" component={ComponentShowcase} />
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="SignUp" component={SignUpScreen} />
        <Tab.Screen name="Playlists" component={PlaylistsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
