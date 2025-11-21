// AppNavigation.tsx
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationContainer,
  DrawerActions,
  createNavigationContainerRef,
} from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  useDrawerProgress,
  useDrawerStatus,
} from "@react-navigation/drawer";
import LinearGradient from "react-native-linear-gradient";
import Animated, { Easing, interpolate, useAnimatedStyle } from "react-native-reanimated";
import Icon from "react-native-vector-icons/Ionicons";

import PlaylistsScreen from "./PlaylistsScreen";
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingsScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import MapScreen from "./MapScreen";

/* ---------------- Keys for persistence ---------------- */
const LAST_SCREEN_KEY = "nav:lastScreen";     // "PlaylistsStack" | "Profile" | "Settings"
const DRAWER_OPEN_KEY = "nav:drawerOpen";     // "true" | "false"

/* ---------------- Nav setup ---------------- */
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const navigationRef = createNavigationContainerRef();

/* ---------- Transitions ---------- */
// 200ms fade for SignUp
const FADE_200 = {
  transitionSpec: {
    open:  { animation: "timing" as const, config: { duration: 200, easing: Easing.linear } },
    close: { animation: "timing" as const, config: { duration: 200, easing: Easing.linear } },
  },
  cardStyleInterpolator: ({ current }: any) => ({
    cardStyle: { opacity: current.progress },
  }),
};

function MapWithScale() {
  return (
    <DrawerAnimatedContainer>
      <DrawerStatusSaver />
      <MapScreen />
    </DrawerAnimatedContainer>
  );
}

/* ---------- Reanimated drawer scale wrapper ---------- */
function DrawerAnimatedContainer({ children }: { children: React.ReactNode }) {
  const progress = useDrawerProgress(); // 0 -> 1
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 0.9]);
    const radius = interpolate(progress.value, [0, 1], [0, 16]);
    const translateX = interpolate(progress.value, [0, 1], [0, 12]);
    return {
      transform: [{ scale }, { translateX }],
      borderRadius: radius,
      overflow: "hidden",
      backgroundColor: "#0b0b0f",
    };
  });
  return <Animated.View style={[{ flex: 1 }, animatedStyle]}>{children}</Animated.View>;
}

/* ---------- Saves drawer open/close to storage ---------- */
function DrawerStatusSaver() {
  const status = useDrawerStatus(); // "open" | "closed"
  React.useEffect(() => {
    AsyncStorage.setItem(DRAWER_OPEN_KEY, String(status === "open"));
  }, [status]);
  return null;
}

/* ---------- Custom Drawer (gradient active item) ---------- */
function CustomDrawerContent(props: any) {
  const { state, descriptors, navigation } = props;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 0, backgroundColor: "#141422" }}
    >
      {/* Drawer Header / User Card */}
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

/* ---------- Inner stack for Playlists (no top-right buttons) ---------- */
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

/* ---------- Drawer screens wrapped with scale + status saver ---------- */
function HomeWithScale() {
  return (
    <DrawerAnimatedContainer>
      <DrawerStatusSaver />
      <PlaylistsStack />
    </DrawerAnimatedContainer>
  );
}
function ProfileWithScale() {
  return (
    <DrawerAnimatedContainer>
      <DrawerStatusSaver />
      <ProfileScreen />
    </DrawerAnimatedContainer>
  );
}
function SettingsWithScale() {
  return (
    <DrawerAnimatedContainer>
      <DrawerStatusSaver />
      <SettingsScreen />
    </DrawerAnimatedContainer>
  );
}

/* ---------- Drawer (Home + Profile + Settings) ---------- */
function MainDrawer({ initialRouteName }: { initialRouteName: string }) {
  return (
    <Drawer.Navigator
      initialRouteName={initialRouteName} // 👈 restore last drawer screen
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

        // icon/text colors
        drawerActiveTintColor: "#1DB954",
        drawerInactiveTintColor: "#b3b3b3",

        // item container rounding
        drawerItemStyle: { borderRadius: 12, overflow: "hidden" },
      }}
    >
      <Drawer.Screen
        name="PlaylistsStack"
        component={HomeWithScale}
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileWithScale}
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

      <Drawer.Screen
  name="Map"
  component={MapWithScale}
  options={({ navigation }) => ({
    headerShown: true,
    title: "Map",
    headerStyle: { backgroundColor: "#121212" },
    headerTintColor: "#fff",
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={{ marginLeft: 12 }}
      >
        <Icon name="menu-outline" color="#fff" size={28} />
      </TouchableOpacity>
    ),
    drawerIcon: ({ color, size }) => (
      <Icon name="map-outline" color={color} size={size} />
    ),
  })}
/>


      <Drawer.Screen
        name="Settings"
        component={SettingsWithScale}
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

/* ---------- Helpers: find current drawer screen name ---------- */
function getCurrentDrawerRoute(state: any): string | null {
  if (!state) return null;
  // root -> Stack
  const rootRoute = state.routes?.[state.index];
  if (!rootRoute) return null;
  if (rootRoute.name !== "Main") return null; // we're not in the drawer yet

  const drawerState = rootRoute.state;
  if (!drawerState) return null;
  const drawerRoute = drawerState.routes?.[drawerState.index];
  return drawerRoute?.name ?? null;
}

/* ---------- Root (Auth -> Main) with persistence ---------- */
export default function AppNavigation() {
  const [initialDrawerRoute, setInitialDrawerRoute] = React.useState<string>("PlaylistsStack");
  const [startOnMain, setStartOnMain] = React.useState<boolean>(false); // go straight to Main if we have a saved drawer screen
  const shouldOpenDrawerRef = React.useRef<boolean>(false);

  // Load persisted state (last drawer screen + drawer open)
  React.useEffect(() => {
    (async () => {
      try {
        const savedScreen = await AsyncStorage.getItem(LAST_SCREEN_KEY);
        if (savedScreen === "Profile" || savedScreen === "Settings" || savedScreen === "PlaylistsStack") {
          setInitialDrawerRoute(savedScreen);
          setStartOnMain(true);
        }
        const savedDrawerOpen = await AsyncStorage.getItem(DRAWER_OPEN_KEY);
        shouldOpenDrawerRef.current = savedDrawerOpen === "true";
      } catch {
        // fall back to defaults
        setInitialDrawerRoute("PlaylistsStack");
        setStartOnMain(false);
      }
    })();
  }, []);

  // Persist last drawer screen on any nav state change
  const onStateChange = React.useCallback(async () => {
    try {
      const state = navigationRef.getRootState();
      const drawerRoute = getCurrentDrawerRoute(state);
      if (drawerRoute) {
        await AsyncStorage.setItem(LAST_SCREEN_KEY, drawerRoute);
      }
    } catch {
      // ignore
    }
  }, []);

  // Open the drawer if it was open last time (after nav is ready)
  const handleReady = React.useCallback(() => {
    if (shouldOpenDrawerRef.current) {
      // We are already inside Main (if startOnMain). Dispatch open.
      navigationRef.dispatch(DrawerActions.openDrawer());
    }
  }, []);

  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange} onReady={handleReady}>
      <Stack.Navigator initialRouteName={startOnMain ? "Main" : "Login"} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* 200ms fade for SignUp */}
        <Stack.Screen name="SignUp" component={SignUpScreen} options={FADE_200} />
        <Stack.Screen name="Main">
          {() => <MainDrawer initialRouteName={initialDrawerRoute} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
