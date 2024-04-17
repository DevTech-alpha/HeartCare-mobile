import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  profileImageContainer: {
    alignItems: "center",
    margin: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    
  },
});
