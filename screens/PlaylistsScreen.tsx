// screens/PlaylistsScreen.tsx
import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./PlaylistsScreenStyles";

const playlists = [
  {
    id: "1",
    title: "Top Hits 2025",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&w=200&h=200",
  },
  {
    id: "2",
    title: "Chill Vibes",
    image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?crop=entropy&cs=tinysrgb&fit=max&w=200&h=200",
  },
  {
    id: "3",
    title: "Workout Mix",
    image: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?crop=entropy&cs=tinysrgb&fit=max&w=200&h=200",
  },
];

const songs = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?crop=entropy&cs=tinysrgb&fit=max&w=60&h=60",
  },
  {
    id: "2",
    title: "As It Was",
    artist: "Harry Styles",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&w=60&h=60",
  },
  {
    id: "3",
    title: "Levitating",
    artist: "Dua Lipa",
    cover: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?crop=entropy&cs=tinysrgb&fit=max&w=60&h=60",
  },
  {
    id: "4",
    title: "Brightest Heart",
    artist: "Oguri Cap",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/eb/76/6b/eb766b24-bb40-1daa-e050-f53993c2455f/25UMGIM43629.rgb.jpg/800x800cc.jpg",
  },
];

const PlaylistsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Greeting */}
        <Text style={styles.greeting}>Good Morning</Text>

        {/* Playlist Row */}
        <View style={styles.playlistRow}>
          {playlists.map((pl) => (
            <TouchableOpacity key={pl.id} style={styles.playlistCard}>
              <Image source={{ uri: pl.image }} style={styles.playlistImage} />
              <Text style={styles.playlistTitle}>{pl.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommended Section */}
        <Text style={styles.sectionTitle}>Recommended for you</Text>
        {songs.map((song) => (
          <TouchableOpacity key={song.id} style={styles.songCard}>
            <Image source={{ uri: song.cover }} style={styles.songImage} />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.songArtist}>{song.artist}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlaylistsScreen;
