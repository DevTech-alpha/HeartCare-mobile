import { StyleSheet } from "react-native";

export interface Theme {
  COLORS: {
    BACKGROUND_CARD: string;
    BACKGROUND: string;
    BUTTON: string;
    BUTTON_TEXT: string;
    TEXT: string;
    ICON: string;
    PRIMARY: string;
    WHITE: string;
    POST_TITLE: string;
    POST_CONTENT: string;
    OVERLAY: string;
    DISABLED: string;
  };
}

export const themes: { light: Theme; dark: Theme } = {
  light: {
    COLORS: {
      BACKGROUND_CARD: "#F0F2F5",
      BACKGROUND: "#E4E6EF",
      BUTTON: "#C94F52",
      BUTTON_TEXT: "#FFF",
      TEXT: "#000",
      ICON: "#333",
      PRIMARY: "#A2272C",
      WHITE: "#FFF",
      POST_TITLE: "#333",
      POST_CONTENT: "#555",
      OVERLAY: "rgba(0,0,0,0.6)",
      DISABLED: "#A0A0A0",
    },
  },
  dark: {
    COLORS: {
      BACKGROUND_CARD: "#222",
      BACKGROUND: "#000",
      BUTTON: "#C94F52",
      BUTTON_TEXT: "#FFF",
      TEXT: "#FFF",
      ICON: "#FFF",
      PRIMARY: "#A2272C",
      WHITE: "#FFF",
      POST_TITLE: "#FFF",
      POST_CONTENT: "#DDD",
      OVERLAY: "rgba(0,0,0,0.8)",
      DISABLED: "#505050",
    },
  },
};
const shadow = StyleSheet.create({
  shadowOverlay: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default shadow;