// screens/PlaylistsScreenStyles.ts
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 15,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  playlistRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  playlistCard: {
    alignItems: "center",
    marginRight: 15,
  },
  playlistImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  playlistTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginVertical: 15,
  },
  songCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  songArtist: {
    color: "#B3B3B3",
    fontSize: 14,
  },
});

export default styles;
