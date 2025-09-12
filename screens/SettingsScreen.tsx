// SettingsScreen.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./SettingsScreenStyles";

function Row({
  icon,
  title,
  subtitle,
  value,
  onValueChange,
  onPress,
  isSwitch,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  value?: boolean;
  onValueChange?: (val: boolean) => void;
  onPress?: () => void;
  isSwitch?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={!isSwitch ? onPress : undefined}
      style={styles.row}
    >
      <View style={styles.rowLeft}>
        <Icon name={icon as any} size={20} color="#1DB954" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.rowTitle}>{title}</Text>
          {subtitle ? <Text style={styles.rowSubtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      {isSwitch ? (
        <Switch value={!!value} onValueChange={onValueChange} />
      ) : (
        <Icon name="chevron-forward" size={18} color="#aaa" />
      )}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [offline, setOffline] = useState(false);
  const [dataSaver, setDataSaver] = useState(false);
  const [explicit, setExplicit] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);

  const clearCache = () =>
    Alert.alert("Clear cache", "Remove downloaded images and temp data?", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: () => Alert.alert("Cleared") },
    ]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}></Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Playback</Text>
        <Row
          icon="cloud-offline-outline"
          title="Offline mode"
          subtitle="Only play downloaded content"
          value={offline}
          onValueChange={setOffline}
          isSwitch
        />
        <Row
          icon="speedometer-outline"
          title="Data saver"
          subtitle="Lower audio quality and reduce data usage"
          value={dataSaver}
          onValueChange={setDataSaver}
          isSwitch
        />
        <Row
          icon="warning-outline"
          title="Allow explicit content"
          subtitle="Block songs marked explicit when off"
          value={explicit}
          onValueChange={setExplicit}
          isSwitch
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <Row
          icon="moon-outline"
          title="Dark mode"
          subtitle="Use dark theme"
          value={darkMode}
          onValueChange={setDarkMode}
          isSwitch
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <Row
          icon="notifications-outline"
          title="Push notifications"
          subtitle="New music and updates"
          value={pushNotifs}
          onValueChange={setPushNotifs}
          isSwitch
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Row
          icon="information-circle-outline"
          title="Version"
          subtitle="1.0.0"
          onPress={() => Alert.alert("Version", "1.0.0")}
        />
        <Row
          icon="trash-outline"
          title="Clear cache"
          subtitle="Free up temporary storage"
          onPress={clearCache}
        />
        <Row
          icon="document-text-outline"
          title="Terms and Privacy"
          onPress={() => Alert.alert("Open", "Link your TOS/Privacy URL")}
        />
      </View>
    </SafeAreaView>
  );
}
