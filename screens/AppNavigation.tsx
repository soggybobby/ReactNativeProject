// AppNavigation.tsx
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import {
  NavigationContainer,
  DrawerActions,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";

import PlaylistsScreen from "./PlaylistsScreen";
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingsScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  const { state, descriptors, navigation } = props;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 0, backgroundColor: "#141422" }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          backgroundColor: "#121212ff",
          padding: 16,
          paddingTop: 48,
          borderBottomColor: "rgba(255,255,255,0.06)",
          borderBottomWidth: 1,
        }}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon name="person-circle-outline" size={56} color="#fff" />
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700", marginTop: 8 }}>
          soggybobby
        </Text>
        <Text style={{ color: "#b3b3b3", fontSize: 12 }}>bob@gmail.com</Text>
      </TouchableOpacity>

      {/* Drawer Items with Gradient Active Background */}
      <View style={{ backgroundColor: "#141422", flex: 1 }}>
        {state.routes.map((route: any, index: number) => {
          const focused = index === state.index;
          const options = descriptors[route.key]?.options || {};
          const label = options.title ?? route.name;
          const icon = options.drawerIcon;

          const baseItemStyle = {
            borderRadius: 12,
            marginHorizontal: 8,
            marginVertical: 4,
          } as const;

          if (focused) {
            // Active item → Gradient background
            return (
              <LinearGradient
                key={route.key}
                colors={["#1DB954", "#0b0b0f"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={baseItemStyle}
              >
                <DrawerItem
                  label={label}
                  icon={icon}
                  focused
                  onPress={() => navigation.navigate(route.name)}
                  labelStyle={{ color: "#fff", fontWeight: "700" }}
                  style={{ backgroundColor: "transparent" }}
                  pressColor="transparent"
                />
              </LinearGradient>
            );
          }

          // Inactive item → normal look with subtle press color
          return (
            <DrawerItem
              key={route.key}
              label={label}
              icon={icon}
              focused={false}
              onPress={() => navigation.navigate(route.name)}
              labelStyle={{ color: "#b3b3b3" }}
              style={baseItemStyle}
              pressColor="rgba(255,255,255,0.08)"
            />
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
}

/** ---------- Inner stack for Playlists ---------- */
function PlaylistsStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: "#121212" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() =>
              navigation.getParent()?.dispatch(DrawerActions.openDrawer())
            }
            style={{ marginLeft: 12 }}
          >
            <Icon name="menu-outline" size={28} color="#fff" />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen name="Playlists" component={PlaylistsScreen} />
    </Stack.Navigator>
  );
}

/** ---------- Drawer (Home + Profile + Settings) ---------- */
function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,

        // gestures
        swipeEnabled: true,
        swipeEdgeWidth: 80,
        swipeMinDistance: 20,

        // drawer container look
        drawerType: "slide",
        drawerStyle: { backgroundColor: "#141421", width: 280 },

        // icon/text colors (inactive state text)
        drawerActiveTintColor: "#1DB954",
        drawerInactiveTintColor: "#b3b3b3",

        // item container rounding
        drawerItemStyle: {
          borderRadius: 12,
          overflow: "hidden",
        },
      }}
    >
      <Drawer.Screen
        name="PlaylistsStack"
        component={PlaylistsStack}
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />

      {/* Profile shows its own header with hamburger */}
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: { backgroundColor: "#121212" },
          headerTintColor: "#fff",
          headerTitleStyle: { color: "#fff" },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{ marginLeft: 12 }}
            >
              <Icon name="menu-outline" size={28} color="#fff" />
            </TouchableOpacity>
          ),
          drawerIcon: ({ color, size }) => (
            <Icon name="person-circle-outline" color={color} size={size} />
          ),
        })}
      />

      {/* Settings shows its own header with hamburger */}
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: { backgroundColor: "#121212" },
          headerTintColor: "#fff",
          headerTitleStyle: { color: "#fff" },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{ marginLeft: 12 }}
            >
              <Icon name="menu-outline" size={28} color="#fff" />
            </TouchableOpacity>
          ),
          drawerIcon: ({ color, size }) => (
            <Icon name="settings-outline" color={color} size={size} />
          ),
        })}
      />
    </Drawer.Navigator>
  );
}

/** ---------- Root (Auth -> Main) ---------- */
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
