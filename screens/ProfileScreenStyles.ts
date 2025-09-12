import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0b0f", paddingHorizontal: 16 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 12,
  },
  header: { fontSize: 22, color: "#fff", fontWeight: "700" },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141421",
    padding: 12,
    borderRadius: 12,
  },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 12 },
  name: { color: "#fff", fontSize: 18, fontWeight: "700" },
  handle: { color: "#b3b3b3", marginTop: 2, fontSize: 13 },
  email: { color: "#b3b3b3", fontSize: 12 },

  editBtn: {
    backgroundColor: "#1DB954",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
  editText: { color: "#000", fontWeight: "700" },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#141421",
    borderRadius: 12,
    paddingVertical: 12,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statNumber: { color: "#fff", fontSize: 17, fontWeight: "800" },
  statLabel: { color: "#b3b3b3", fontSize: 12, marginTop: 2 },

  section: {
    backgroundColor: "#141421",
    borderRadius: 12,
    marginTop: 16,
    paddingVertical: 4,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemLeft: { flexDirection: "row", alignItems: "center" },
  itemTitle: { color: "#fff", fontSize: 15, fontWeight: "600" },
  itemSubtitle: { color: "#b3b3b3", fontSize: 12, marginTop: 2 },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1DB954",
    marginTop: 18,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: "center",
  },
  logoutText: { color: "#000", fontWeight: "800" },
});
