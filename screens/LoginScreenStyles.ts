import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
  socialButton: {
    width: "100%",
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
    alignItems: "center",
  },
  socialText: {
    color: "white",
    fontWeight: "600",
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
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#121212",
    color: "white",
    marginBottom: 12,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#1DB954",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    color: "black",
    fontWeight: "700",
  },
  link: {
    color: "#B3B3B3",
    marginTop: 15,
    textDecorationLine: "underline",
  },
  footer: {
    flexDirection: "row",
    marginTop: 30,
  },
  footerText: {
    color: "#B3B3B3",
  },
  signupLink: {
    color: "white",
    fontWeight: "700",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
});
