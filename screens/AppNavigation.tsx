// AppNavigation.tsx
import React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";

import PlaylistsScreen from "./PlaylistsScreen";
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingsScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

/** Inner stack for playlists with header buttons */
function PlaylistsStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#121212" },
        headerTintColor: "#fff",
        headerRight: () => (
          <>
            <TouchableOpacity onPress={() => navigation.navigate("Profile" as never)} style={{ marginRight: 15 }}>
              <Icon name="person-circle-outline" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Settings" as never)} style={{ marginRight: 15 }}>
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

/** Your main app after login */
function MainDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="PlaylistsStack" component={PlaylistsStack} options={{ title: "Home" }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

/** Root navigator that starts at Login */
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={MainDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
