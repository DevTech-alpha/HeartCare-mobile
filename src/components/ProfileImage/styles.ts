import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  choosePhotoText: {
    fontSize: 20,
    color:  theme.COLORS.PRIMARY,
    marginTop: 15,
  },
});
