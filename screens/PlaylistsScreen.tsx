// PlaylistsScreen.tsx
import React, { useState, useMemo, useReducer, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./PlaylistsScreenStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { toggleTheme } from "./store/themeSlice";

// --- Playlist Builder Types and Reducer ---
type Song = { id: string; title: string; artist: string; cover: string };
type PlaylistState = {
  past: Song[][];
  present: Song[];
  future: Song[][];
  history: string[];
};
type PlaylistAction = {
  type: "ADD" | "REMOVE" | "CLEAR" | "UNDO" | "REDO";
  title?: string;
  id?: string;
};

const playlistReducer = (state: PlaylistState, action: PlaylistAction): PlaylistState => {
  switch (action.type) {
    case "ADD":
      if (!action.title) return state;
      const newSong: Song = {
        id: Math.random().toString(36).slice(2),
        title: action.title,
        artist: "Unknown",
        cover: "default_cover.jpg",
      };
      return {
        ...state,
        past: [...state.past, state.present],
        present: [newSong, ...state.present],
        future: [],
        history: [...state.history, `Added ${newSong.title}`],
      };

    case "REMOVE":
      if (!action.id) return state;
      const removedSongs = state.present.filter((song) => song.id !== action.id);
      return {
        ...state,
        past: [...state.past, state.present],
        present: removedSongs,
        future: [],
        history: [...state.history, `Removed song`],
      };

    case "CLEAR":
      return {
        ...state,
        past: [...state.past, state.present],
        present: [],
        future: [],
        history: [...state.history, "Cleared playlist"],
      };

    case "UNDO":
      if (state.past.length === 0) return state;
      const prevState = state.past[state.past.length - 1];
      return {
        ...state,
        past: state.past.slice(0, -1),
        present: prevState,
        future: [state.present, ...state.future],
        history: [...state.history, "Undo action"],
      };

    case "REDO":
      if (state.future.length === 0) return state;
      const nextState = state.future[0];
      return {
        ...state,
        past: [...state.past, state.present],
        present: nextState,
        future: state.future.slice(1),
        history: [...state.history, "Redo action"],
      };

    default:
      return state;
  }
};

// Initial state
const initialState: PlaylistState = {
  past: [],
  present: [],
  future: [],
  history: [],
};

// --- Playlists Data ---
type Playlist = { id: string; title: string; image: string };

const recent: Playlist[] = [
  { id: "1", title: "Top Hits 2025", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&w=300&h=300" },
  { id: "2", title: "Chill Vibes", image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?crop=entropy&cs=tinysrgb&fit=max&w=300&h=300" },
  { id: "3", title: "Workout Mix", image: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?crop=entropy&cs=tinysrgb&fit=max&w=300&h=300" },
  { id: "4", title: "Focus Flow", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&w=300&h=300" },
  { id: "5", title: "Lo-fi Beats", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&w=300&h=300" },
  { id: "6", title: "Party Time", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?crop=entropy&cs=tinysrgb&fit=max&w=300&h=300" },
];

const madeForYou: Playlist[] = [
  { id: "m1", title: "Daily Mix 1", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?crop=entropy&cs=tinysrgb&fit=max&w=300&h=300" },
  { id: "m2", title: "Daily Mix 2", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?crop=entropy&cs=tinysrgb&fit=max&w=300&h=300" },
  { id: "m3", title: "Daily Mix 3", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?crop=entropy&cs=tinysrgb&fit=max&w=300&h=300" },
  { id: "m4", title: "Discover Weekly", image: "https://images.unsplash.com/photo-1512686096451-a15c19314c85?crop=entropy&cs=tinysrgb&fit=max&w=300&h=300" },
  { id: "m5", title: "Release Radar", image: "https://images.unsplash.com/photo-1446057032654-9d8885db76c6?crop=entropy&cs=tinysrgb&fit=max&w=300&h=300" },
];

const recommendations: Song[] = [
  { id: "1", title: "Blinding Lights", artist: "The Weeknd", cover: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?crop=entropy&cs=tinysrgb&fit=max&w=80&h=80" },
  { id: "2", title: "As It Was", artist: "Harry Styles", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&w=80&h=80" },
  { id: "3", title: "Levitating", artist: "Dua Lipa", cover: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?crop=entropy&cs=tinysrgb&fit=max&w=80&h=80" },
  { id: "4", title: "Brightest Heart", artist: "Oguri Cap", cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/eb/76/6b/eb766b24-bb40-1daa-e050-f53993c2455f/25UMGIM43629.rgb.jpg/800x800cc.jpg" },
];

// --- Main Screen ---
export default function PlaylistsScreen() {
  const [input, setInput] = useState<string>("");
  const [playlistState, dispatch] = useReducer(playlistReducer, initialState);

  const reduxDispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  // Playlist Builder Actions
  const addSong = () => {
    const title = input.trim();
    if (!title) {
      Alert.alert("Missing title", "Please enter a song name.");
      return;
    }
    dispatch({ type: "ADD", title });
    setInput("");
  };

  const removeSong = (id: string) => dispatch({ type: "REMOVE", id });
  const undo = () => dispatch({ type: "UNDO" });
  const redo = () => dispatch({ type: "REDO" });

  // Save state
  useEffect(() => {
    const storeState = async () => {
      try {
        await AsyncStorage.setItem("playlistState", JSON.stringify(playlistState));
      } catch (e) {
        console.error("Failed to save state", e);
      }
    };
    storeState();
  }, [playlistState]);

  

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme === "light" ? "#fff" : "#222" },
      ]}
    >
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text
          style={[styles.greeting, { color: theme === "light" ? "#000" : "#fff" }]}
        >
          {greeting}
        </Text>

        {/* 🌙 Theme Toggle Button */}
        <TouchableOpacity
          style={styles.pillBtn}
          onPress={() => reduxDispatch(toggleTheme())}
        >
          <Icon
            name={theme === "light" ? "moon-outline" : "sunny-outline"}
            size={20}
            color={theme === "light" ? "#000" : "#fff"}
          />
          <Text
            style={[
              styles.pillText,
              { color: theme === "light" ? "#000" : "#fff" },
            ]}
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Recent Playlists */}
        <Text style={[styles.sectionTitle, { color: theme === "light" ? "#000" : "#fff" }]}>
          Recently Played
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recent.map((item) => (
            <View key={item.id} style={styles.playlistCard}>
              <Image source={{ uri: item.image }} style={styles.playlistImage} />
              <Text style={[styles.playlistTitle, { color: theme === "light" ? "#000" : "#fff" }]}>
                {item.title}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Made For You */}
        <Text style={[styles.sectionTitle, { color: theme === "light" ? "#000" : "#fff" }]}>
          Made For You
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {madeForYou.map((item) => (
            <View key={item.id} style={styles.playlistCard}>
              <Image source={{ uri: item.image }} style={styles.playlistImage} />
              <Text style={[styles.playlistTitle, { color: theme === "light" ? "#000" : "#fff" }]}>
                {item.title}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Recommendations */}
        <Text style={[styles.sectionTitle, { color: theme === "light" ? "#000" : "#fff" }]}>
          Recommended
        </Text>
        {recommendations.map((song) => (
          <View key={song.id} style={styles.songRow}>
            <Image source={{ uri: song.cover }} style={styles.songCover} />
            <View style={styles.songInfo}>
              <Text style={{ color: theme === "light" ? "#000" : "#fff" }}>{song.title}</Text>
              <Text style={{ color: theme === "light" ? "#555" : "#aaa" }}>{song.artist}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
