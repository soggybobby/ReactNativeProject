import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b0b0f", paddingHorizontal: 16 },
  header: { color: "#fff", fontSize: 22, fontWeight: "800", marginTop: 8, marginBottom: 12 },

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
    backgroundColor: "#1DB954",
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

  pillText: { color: "#000", fontWeight: "600" },  // 👈 Added this

  sectionTitle: { color: "#b3b3b3", fontSize: 12, marginTop: 8, marginBottom: 6 },
  emptyText: { color: "#6f6f73", fontSize: 13, marginBottom: 8 },

  songRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141421",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 8,
  },
  songTitle: { color: "#fff", fontSize: 15, fontWeight: "600", flex: 1 },
  iconBtn: {
    backgroundColor: "#1DB954",
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
  historyDot: { color: "#1DB954", marginRight: 8, fontSize: 14 },
  historyText: { color: "#ddd", flex: 1 },
});
