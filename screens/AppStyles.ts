// styles/AppStyles.ts
import { StyleSheet } from "react-native";

const AppStyles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  loginContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 180,
    height: 60,
    marginBottom: 40,
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#1DB954",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginBottom: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    color: "#999",
    marginVertical: 15,
    fontSize: 14,
  },
  socialButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginVertical: 5,
  },
  socialText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AppStyles;
