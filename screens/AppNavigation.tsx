// navigation/AppNavigation.tsx
import React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/Ionicons';

import PlaylistsScreen from "./PlaylistsScreen";
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingsScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack for Playlists with header buttons
function PlaylistsStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#121212" },
        headerTintColor: "#fff",
        headerRight: () => (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              style={{ marginRight: 15 }}
            >
              <Icon name="person-circle-outline" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Settings")}
              style={{ marginRight: 15 }}
            >
              <Icon name="settings-outline" size={28} color="#fff" />
            </TouchableOpacity>
          </>
        ),
      })}
    >
      <Stack.Screen name="Playlists" component={PlaylistsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

// Drawer containing the Playlists stack
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false, // Hide default header for Drawer screens
        }}
      >
        <Drawer.Screen name="PlaylistsStack" component={PlaylistsStack} options={{ title: "Home" }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
