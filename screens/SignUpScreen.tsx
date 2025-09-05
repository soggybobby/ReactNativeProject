import React from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import styles from "./SignUpScreenStyles";

const SignUpScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Spotify Logo */}
      <Image
        source={{
          uri: "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Green.png",
        }}
        style={styles.logo}
      />

      {/* Input Fields */}
      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* Social Signup Buttons */}
      <View style={styles.socialRow}>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: "#1877F2" }]}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/124/124010.png",
            }}
            style={{ width: 24, height: 24 }}
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

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.loginLink}>Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
