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
});

export default styles;
