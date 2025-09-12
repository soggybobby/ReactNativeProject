import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./ProfileScreenStyles";

type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

type Nav = StackNavigationProp<RootStackParamList, "Main">;

const mockUser = {
  name: "soggybobby",
  handle: "@slopster123",
  email: "bob@gmail.com",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUXTrtsb0azOm39WJQXTXNQz-L247BITsFyQ&s",
  playlists: 18,
  followers: 243,
  following: 56,
};

export default function ProfileScreen() {
  const navigation = useNavigation<Nav>();

  const onEdit = () => Alert.alert("Edit profile", "Do something about this later.");
  const onLogout = () =>
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: () => navigation.reset({ index: 0, routes: [{ name: "Login" }] }),
      },
    ]);

  const Item = ({
    icon,
    title,
    subtitle,
    onPress,
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity style={styles.item} activeOpacity={0.75} onPress={onPress}>
      <View style={styles.itemLeft}>
        <Icon name={icon as any} size={20} color="#1DB954" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.itemTitle}>{title}</Text>
          {subtitle ? <Text style={styles.itemSubtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      <Icon name="chevron-forward" size={18} color="#aaa" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
      </View>

      <View style={styles.card}>
        <Image source={{ uri: mockUser.avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{mockUser.name}</Text>
          <Text style={styles.handle}>{mockUser.handle}</Text>
          <Text style={styles.email}>{mockUser.email}</Text>
        </View>
        <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{mockUser.playlists}</Text>
          <Text style={styles.statLabel}>Playlists</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{mockUser.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{mockUser.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Item icon="person-circle-outline" title="Account" subtitle="Manage your account details" onPress={() => Alert.alert("Account")} />
        <Item icon="download-outline" title="Downloads" subtitle="Offline music and storage" onPress={() => Alert.alert("Downloads")} />
        <Item icon="notifications-outline" title="Notifications" subtitle="Push and email" onPress={() => Alert.alert("Notifications")} />
        <Item icon="shield-checkmark-outline" title="Privacy" subtitle="Permissions and data" onPress={() => Alert.alert("Privacy")} />
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout} activeOpacity={0.8}>
        <Icon name="log-out-outline" size={18} color="#000" />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
