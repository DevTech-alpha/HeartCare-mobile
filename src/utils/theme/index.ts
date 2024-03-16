import { Theme } from "./Models/theme";

export const themes: { light: Theme; dark: Theme } = {
  light: {
    COLORS: {
      BACKGROUND_CARD: "#F0F2F5",
      BACKGROUND: "#E4E6EF",
      BUTTON: "#9f0a2f",
      BUTTON_TEXT: "#FFF",
      TEXT: "#818181",
      ICON: "#333",
      PRIMARY: "#800020",
      WHITE: "#FFF",
      POST_TITLE: "#333",
      POST_CONTENT: "#555",
      OVERLAY: "rgba(0,0,0,0.6)",
    },
  },
  dark: {
    COLORS: {
      BACKGROUND_CARD: "#222",
      BACKGROUND: "#111",
      BUTTON: "#9f0a2f",
      BUTTON_TEXT: "#FFF",
      TEXT: "#c9c9c9",
      ICON: "#FFF",
      PRIMARY: "#800020",
      WHITE: "#FFF",
      POST_TITLE: "#FFF",
      POST_CONTENT: "#DDD",
      OVERLAY: "rgba(0,0,0,0.8)",
    },
  },
};
