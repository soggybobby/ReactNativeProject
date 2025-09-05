import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 140,
    height: 40,
    resizeMode: "contain",
    marginBottom: 30,
    marginTop: 40,
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#121212",
    color: "white",
    marginBottom: 12,
  },
  signupButton: {
    width: "100%",
    backgroundColor: "#1DB954",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  signupText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#333",
  },
  orText: {
    color: "#B3B3B3",
    marginHorizontal: 10,
    fontWeight: "600",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  footer: {
    flexDirection: "row",
    marginTop: 30,
  },
  footerText: {
    color: "#B3B3B3",
  },
  loginLink: {
    color: "white",
    fontWeight: "700",
  },
});

export default styles;
