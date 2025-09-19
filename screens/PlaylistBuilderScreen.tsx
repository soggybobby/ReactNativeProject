import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Keyboard,
} from "react-native";
import styles from "./PlaylistBuilderStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  FadeInDown,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/Ionicons";

// ----- Types -----
type Song = { id: string; title: string };
type ActionHistory = { id: string; label: string; ts: number };

type PlaylistState = {
  past: Song[][];
  present: Song[];
  future: Song[][];
  history: ActionHistory[]; // simple log of actions performed
};

type PlaylistAction =
  | { type: "ADD"; title: string }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "RESTORE"; payload: PlaylistState };

// ----- Storage Keys -----
const STORAGE_KEY = "playlist_builder:persist_v1";

// ----- Helpers -----
const uid = () => Math.random().toString(36).slice(2);

const pushHistory = (history: ActionHistory[], label: string) => {
  const next = [{ id: uid(), label, ts: Date.now() }, ...history];
  return next.slice(0, 20); // keep last 20 actions
};

function playlistReducer(state: PlaylistState, action: PlaylistAction): PlaylistState {
  switch (action.type) {
    case "ADD": {
      const title = action.title.trim();
      if (!title) return state;

      const nextPresent: Song[] = [{ id: uid(), title }, ...state.present];
      return {
        past: [...state.past, state.present],
        present: nextPresent,
        future: [],
        history: pushHistory(state.history, `Added: “${title}”`),
      };
    }
    case "REMOVE": {
      const song = state.present.find((s) => s.id === action.id);
      const nextPresent = state.present.filter((s) => s.id !== action.id);
      return {
        past: [...state.past, state.present],
        present: nextPresent,
        future: [],
        history: pushHistory(state.history, `Removed: “${song?.title ?? "Unknown"}”`),
      };
    }
    case "CLEAR": {
      if (state.present.length === 0) return state;
      return {
        past: [...state.past, state.present],
        present: [],
        future: [],
        history: pushHistory(state.history, "Cleared playlist"),
      };
    }
    case "UNDO": {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, -1);
      return {
        past: newPast,
        present: previous,
        future: [state.present, ...state.future],
        history: pushHistory(state.history, "Undo"),
      };
    }
    case "REDO": {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      return {
        past: [...state.past, state.present],
        present: next,
        future: newFuture,
        history: pushHistory(state.history, "Redo"),
      };
    }
    case "RESTORE": {
      // Defensive guard for corrupted data
      const p = Array.isArray(action.payload.present) ? action.payload.present : [];
      const pa = Array.isArray(action.payload.past) ? action.payload.past : [];
      const f = Array.isArray(action.payload.future) ? action.payload.future : [];
      const h = Array.isArray(action.payload.history) ? action.payload.history : [];
      return { past: pa, present: p, future: f, history: h };
    }
    default:
      return state;
  }
}

const initialState: PlaylistState = {
  past: [],
  present: [],
  future: [],
  history: [],
};

// Memoized row (perf)
const SongRow = React.memo(function SongRow({
  item,
  onRemove,
}: {
  item: Song;
  onRemove: (id: string) => void;
}) {
  return (
    <Animated.View
      entering={FadeInDown.springify().damping(16)}
      exiting={FadeOutUp.duration(160)}
      layout={LinearTransition.duration(180)}
      style={styles.songRow}
    >
      <Text style={styles.songTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <TouchableOpacity
        onPress={() => onRemove(item.id)}
        style={styles.iconBtn}
        accessibilityLabel={`Remove ${item.title}`}
      >
        <Icon name="trash-outline" size={18} color="#000" />
      </TouchableOpacity>
    </Animated.View>
  );
});

export default function PlaylistBuilderScreen() {
  const [state, dispatch] = React.useReducer(playlistReducer, initialState);
  const [input, setInput] = React.useState("");

  // ---- Load persisted state on mount ----
  React.useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        dispatch({ type: "RESTORE", payload: parsed });
      } catch {
        // ignore; will start fresh
      }
    })();
  }, []);

  // ---- Persist on changes (present + history + stacks) ----
  React.useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [state]);

  const addSong = () => {
    const title = input.trim();
    if (!title) {
      Alert.alert("Missing title", "Please enter a song name.");
      return;
    }
    dispatch({ type: "ADD", title });
    setInput("");
    Keyboard.dismiss();
  };

  const removeSong = (id: string) => dispatch({ type: "REMOVE", id });
  const clearAll = () => dispatch({ type: "CLEAR" });
  const undo = () => dispatch({ type: "UNDO" });
  const redo = () => dispatch({ type: "REDO" });

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Playlist Builder</Text>

      {/* Input row */}
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

      {/* Action buttons */}
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

        <TouchableOpacity style={[styles.pillBtn, styles.dangerBtn]} onPress={clearAll}>
          <Icon name="trash" size={18} color="#000" />
          <Text style={styles.pillText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Playlist */}
      <Text style={styles.sectionTitle}>Current Playlist</Text>
      <FlatList
        data={state.present}
        keyExtractor={(s) => s.id}
        renderItem={({ item }) => <SongRow item={item} onRemove={removeSong} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No songs yet. Add your first track!</Text>
        }
      />

      {/* Simple History */}
      <Text style={styles.sectionTitle}>History</Text>
      {state.history.length === 0 ? (
        <Text style={styles.emptyText}>No actions yet.</Text>
      ) : (
        <View style={styles.historyBox}>
          {state.history.map((h) => (
            <View key={h.id} style={styles.historyRow}>
              <Text style={styles.historyDot}>•</Text>
              <Text style={styles.historyText} numberOfLines={1}>
                {h.label}
              </Text>
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}
