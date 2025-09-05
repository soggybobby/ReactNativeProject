// screens/SettingsScreen.tsx
import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

const SettingsScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.text}>Settings Screen</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
  text: { color: "#fff", fontSize: 24, fontWeight: "bold" },
});

export default SettingsScreen;
