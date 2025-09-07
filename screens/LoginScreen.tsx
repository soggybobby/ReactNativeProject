// LoginScreen.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import styles from "./LoginScreenStyles";

// Keep this in a shared types file later if you like
type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Main: undefined; // your drawer
};

type Nav = StackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const navigation = useNavigation<Nav>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing info", "Please enter your email and password.");
      return;
    }
    // replace history with Main so back does not return to Login
    navigation.reset({ index: 0, routes: [{ name: "Main" }] });
  };

  const goSignUp = () => navigation.navigate("SignUp");
  const onForgot = () => Alert.alert("Coming soon", "Hook this to your reset flow, okay?");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <SafeAreaView style={styles.container}>
        <Image
          source={{
            uri: "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Green.png",
          }}
          style={styles.logo}
        />

        <TextInput
          placeholder="Email or username"
          placeholderTextColor="#aaa"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          returnKeyType="next"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          returnKeyType="done"
          onSubmitEditing={onLogin}
        />

        <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: "#1877F2" }]} onPress={() => Alert.alert("Facebook", "Social login not wired yet")}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/124/124010.png" }}
              style={{ width: 24, height: 24, tintColor: "white" }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.iconButton, { backgroundColor: "#fff" }]} onPress={() => Alert.alert("Google", "Social login not wired yet")}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/300/300221.png" }}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.link} onPress={onForgot}>
          Forgot your password?
        </Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don’t have an account? </Text>
          <Text style={styles.signupLink} onPress={goSignUp}>
            Sign up
          </Text>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
