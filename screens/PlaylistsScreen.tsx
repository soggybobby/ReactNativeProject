import React, { useState, useMemo, useReducer, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./PlaylistsScreenStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

// --- Playlist Builder Types and Reducer ---
type Song = { id: string; title: string; artist: string; cover: string };
type PlaylistState = { past: Song[][]; present: Song[]; future: Song[][]; history: string[] };
type PlaylistAction = { type: "ADD" | "REMOVE" | "CLEAR" | "UNDO" | "REDO"; title?: string; id?: string };

// Reducer function for managing the playlist state
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
        present: [newSong, ...state.present], // Ensure present is an array of Song[]
        future: [],
        history: [...state.history, `Added ${newSong.title}`],
      };

    case "REMOVE":
      if (!action.id) return state;
      const removedSongs = state.present.filter((song) => song.id !== action.id);
      return {
        ...state,
        past: [...state.past, state.present],
        present: removedSongs, // Ensure present remains an array of Song[]
        future: [],
        history: [...state.history, `Removed song`],
      };

    case "CLEAR":
      return {
        ...state,
        past: [...state.past, state.present],
        present: [], // Set present to an empty array of songs
        future: [],
        history: [...state.history, "Cleared playlist"],
      };

    case "UNDO":
      if (state.past.length === 0) return state; // Nothing to undo
      const prevState = state.past[state.past.length - 1]; // Get previous state
      return {
        ...state,
        past: state.past.slice(0, -1), // Remove last past state (we've applied it)
        present: prevState, // Set present to the previous state
        future: [state.present, ...state.future], // Push current state to future
        history: [...state.history, "Undo action"],
      };

    case "REDO":
      if (state.future.length === 0) return state; // Nothing to redo
      const nextState = state.future[0]; // Get next state from future
      return {
        ...state,
        past: [...state.past, state.present], // Push current state to past
        present: nextState, // Set present to the next state
        future: state.future.slice(1), // Remove first future state (we've applied it)
        history: [...state.history, "Redo action"],
      };

    default:
      return state;
  }
};

// Initial state for the playlist reducer
const initialState: PlaylistState = {
  past: [],
  present: [],
  future: [],
  history: [],
};

// --- Playlist Type ---
type Playlist = { id: string; title: string; image: string };

// --- Playlists Data --- (Recent and Recommended Playlists)
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

// --- Main Screen Component ---
export default function PlaylistsScreen() {
  const [input, setInput] = useState<string>(""); // Track user input for song name
  const [playlistState, dispatch] = useReducer(playlistReducer, initialState);

  // Greeting message
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
    const newSong: Song = { 
      id: Math.random().toString(36).slice(2), 
      title, 
      artist: "Unknown", 
      cover: "default_cover.jpg" 
    };
    dispatch({ type: "ADD", title });
    setInput(""); // Clear input field
  };

  // Remove song from playlist
  const removeSong = (id: string) => dispatch({ type: "REMOVE", id });

  // Undo and Redo actions
  const undo = () => dispatch({ type: "UNDO" });
  const redo = () => dispatch({ type: "REDO" });

  const canUndo = playlistState.past.length > 0;
  const canRedo = playlistState.future.length > 0;

  // Store the playlist and history in AsyncStorage on state update
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

  // Restore the state on app launch or reload
  useEffect(() => {
    const loadState = async () => {
      try {
        const savedState = await AsyncStorage.getItem("playlistState");
        if (savedState) {
          dispatch({ type: "CLEAR" }); // First clear any existing state
          const parsedState = JSON.parse(savedState);
          parsedState.past.forEach((state: Song[]) => {
            dispatch({ type: "ADD", title: state[0].title }); // Adding previously stored songs back
          });
        }
      } catch (e) {
        console.error("Failed to load state", e);
      }
    };
    loadState();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.greeting}>{greeting}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Playlist Builder Section */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Add a song (e.g., Blinding Lights)"
            placeholderTextColor="#8b8b8b"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={addSong}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.addBtn} onPress={addSong}>
            <Icon name="add" size={20} color="#000" />
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Undo / Redo / Clear Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.pillBtn, !canUndo && styles.btnDisabled]}
            disabled={!canUndo}
            onPress={undo}
          >
            <Icon name="arrow-undo-outline" size={18} color="#000" />
            <Text style={styles.pillText}>Undo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.pillBtn, !canRedo && styles.btnDisabled]}
            disabled={!canRedo}
            onPress={redo}
          >
            <Icon name="arrow-redo-outline" size={18} color="#000" />
            <Text style={styles.pillText}>Redo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.pillBtn, styles.dangerBtn]} onPress={() => dispatch({ type: "CLEAR" })}>
            <Icon name="trash" size={18} color="#000" />
            <Text style={styles.pillText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Song List */}
        <Text style={styles.playlistSectionTitle}>Current Playlist</Text>
        <FlatList
          data={playlistState.present}
          keyExtractor={(s) => s.id}
          renderItem={({ item }) => (
            <View style={styles.playlistSongRow}>
              <Text style={styles.playlistSongTitle} numberOfLines={1}>{item.title}</Text>
              <TouchableOpacity
                onPress={() => removeSong(item.id)}
                style={styles.songIconBtn}
                accessibilityLabel={`Remove ${item.title}`}
              >
                <Icon name="trash-outline" size={18} color="#000" />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No songs yet. Add your first track!</Text>}
        />

        {/* Recently played */}
        <Text style={styles.sectionTitle}>Recently played</Text>
        <View style={styles.grid}>
          {recent.map((pl) => (
            <TouchableOpacity key={pl.id} style={styles.gridCard} activeOpacity={0.8}>
              <Image source={{ uri: pl.image }} style={styles.gridImage} />
              <Text style={styles.gridTitle} numberOfLines={1}>
                {pl.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Made for you carousel */}
        <Text style={styles.sectionTitle}>Made for you</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {madeForYou.map((pl) => (
            <TouchableOpacity key={pl.id} style={styles.card} activeOpacity={0.85}>
              <Image source={{ uri: pl.image }} style={styles.cardImage} />
              <Text style={styles.cardTitle} numberOfLines={1}>
                {pl.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recommended songs list */}
        <Text style={styles.sectionTitle}>Recommended for you</Text>
        {recommendations.map((song) => (
          <TouchableOpacity key={song.id} style={styles.songRow} activeOpacity={0.7}>
            <Image source={{ uri: song.cover }} style={styles.songImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.songTitle} numberOfLines={1}>
                {song.title}
              </Text>
              <Text style={styles.songArtist} numberOfLines={1}>
                {song.artist}
              </Text>
            </View>
            <TouchableOpacity>
              <Icon name="ellipsis-vertical" size={18} color="#B3B3B3" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
