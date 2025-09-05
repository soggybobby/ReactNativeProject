import React from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import styles from "./LoginScreenStyles";

const LoginScreen = () => {
  return (
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
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialRow}>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: "#1877F2" }]}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/124/124010.png",
            }}
            style={{ width: 24, height: 24, tintColor: "white" }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.iconButton, { backgroundColor: "#fff" }]}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/300/300221.png",
            }}
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>



      <Text style={styles.link}>Forgot your password?</Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account? </Text>
        <Text style={styles.signupLink}>Sign up</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
