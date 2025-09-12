import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0f",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "700",
    paddingVertical: 12,
  },

  section: {
    backgroundColor: "#141421",
    borderRadius: 12,
    marginBottom: 14,
    paddingVertical: 6,
  },
  sectionTitle: {
    color: "#b3b3b3",
    fontSize: 12,
    letterSpacing: 0.5,
    marginLeft: 12,
    marginBottom: 4,
  },

  row: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  rowSubtitle: {
    color: "#b3b3b3",
    fontSize: 12,
    marginTop: 2,
  },
});
