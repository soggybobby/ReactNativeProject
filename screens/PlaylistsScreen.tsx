import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./PlaylistsScreenStyles";

type Playlist = { id: string; title: string; image: string };
type Song = { id: string; title: string; artist: string; cover: string };

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

function useGreeting() {
  return useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  }, []);
}

export default function PlaylistsScreen() {
  const greeting = useGreeting();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.greeting}>{greeting}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Recently played grid */}
        <Text style={styles.sectionTitle}>Recently played</Text>
        <View style={styles.grid}>
          {recent.map(pl => (
            <TouchableOpacity key={pl.id} style={styles.gridCard} activeOpacity={0.8}>
              <Image source={{ uri: pl.image }} style={styles.gridImage} />
              <Text style={styles.gridTitle} numberOfLines={1}>{pl.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Made for you carousel */}
        <View style={styles.rowHeader}>
          <Text style={styles.sectionTitle}>Made for you</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
          {madeForYou.map(pl => (
            <TouchableOpacity key={pl.id} style={styles.card} activeOpacity={0.85}>
              <Image source={{ uri: pl.image }} style={styles.cardImage} />
              <Text style={styles.cardTitle} numberOfLines={1}>{pl.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recommended list */}
        <Text style={styles.sectionTitle}>Recommended for you</Text>
        {recommendations.map(song => (
          <TouchableOpacity key={song.id} style={styles.songRow} activeOpacity={0.7}>
            <Image source={{ uri: song.cover }} style={styles.songImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
              <Text style={styles.songArtist} numberOfLines={1}>{song.artist}</Text>
            </View>
            <TouchableOpacity>
              <Icon name="ellipsis-vertical" size={18} color="#B3B3B3" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sticky mini player */}
      <View style={styles.miniPlayer}>
        <Image source={{ uri: recommendations[0].cover }} style={styles.miniCover} />
        <View style={{ flex: 1 }}>
          <Text style={styles.miniTitle} numberOfLines={1}>{recommendations[0].title}</Text>
          <Text style={styles.miniArtist} numberOfLines={1}>{recommendations[0].artist}</Text>
        </View>
        <TouchableOpacity onPress={() => setIsPlaying(p => !p)} style={styles.miniBtn}>
          <Icon name={isPlaying ? "pause" : "play"} size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.miniIcon}>
          <Icon name="play-skip-forward" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
