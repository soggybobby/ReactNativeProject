// App.tsx
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigation from "./AppNavigation";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigation />
    </GestureHandlerRootView>
  );
}