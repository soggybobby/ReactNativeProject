// screens/ProfileScreen.tsx
import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

const ProfileScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.text}>Profile Screen</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
  text: { color: "#fff", fontSize: 24, fontWeight: "bold" },
});

export default ProfileScreen;
