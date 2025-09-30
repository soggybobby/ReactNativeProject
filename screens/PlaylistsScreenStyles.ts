// PlaylistsScreenStyles.ts
import { StyleSheet } from "react-native";

const GREEN = "#1DB954";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 16,
  },

  /* Top */
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 6,
    marginBottom: 8,
  },
  topIcons: { flexDirection: "row", gap: 12 },
  iconBtn: { padding: 4 },

  greeting: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
  },

  /* Sections */
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginTop: 12,
    marginBottom: 10,
  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 8,
  },
  seeAll: { color: "#B3B3B3", fontSize: 13 },

  /* Recently played grid */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  gridCard: {
    width: "48%",
  },
  gridImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 6,
  },
  gridTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  /* Horizontal cards */
  card: {
    width: 130,
    marginRight: 12,
  },
  cardImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 6,
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  /* Playlist cards (for static playlists) */
  playlistCard: {
    width: 140,
    marginRight: 12,
  },
  playlistImage: {
    width: 140,
    height: 140,
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: "#222",
  },
  playlistTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  /* Song rows */
  songRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 12,
  },
  songImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },

  /* NEW: compatibility keys requested */
  songCover: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  songInfo: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 12,
  },

  songTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  songArtist: {
    color: "#B3B3B3",
    fontSize: 13,
    marginTop: 2,
  },

  /* Mini player */
  miniPlayer: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: "#121212",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  miniCover: { width: 44, height: 44, borderRadius: 6 },
  miniTitle: { color: "#fff", fontWeight: "700", fontSize: 14 },
  miniArtist: { color: "#B3B3B3", fontSize: 12 },
  miniBtn: {
    backgroundColor: GREEN,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  miniIcon: { paddingHorizontal: 6 },

  /* Playlist Builder Styles */
  inputRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  input: {
    flex: 1,
    backgroundColor: "#141421",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 8,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: GREEN,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addText: { color: "#000", fontWeight: "800" },

  actionsRow: { flexDirection: "row", gap: 10, marginBottom: 12 },
  pillBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#27e178",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  dangerBtn: { backgroundColor: "#f1b82d" },
  btnDisabled: { opacity: 0.5 },

  pillText: { color: "#000", fontWeight: "600" },

  playlistSectionTitle: {
    color: "#b3b3b3",
    fontSize: 12,
    marginTop: 8,
    marginBottom: 6,
  },
  emptyText: { color: "#6f6f73", fontSize: 13, marginBottom: 8 },

  playlistSongRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141421",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 8,
  },
  playlistSongTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
  },
  songIconBtn: {
    backgroundColor: GREEN,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginLeft: 8,
  },

  historyBox: {
    backgroundColor: "#141421",
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },
  historyRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  historyDot: { color: GREEN, marginRight: 8, fontSize: 14 },
  historyText: { color: "#ddd", flex: 1 },
});

export default styles;
