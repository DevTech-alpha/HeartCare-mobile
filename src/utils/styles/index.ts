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
    DISABLED: string; // Adicionando a cor para o estado disabled
  };
}

export const themes: { light: Theme; dark: Theme } = {
  light: {
    COLORS: {
      BACKGROUND_CARD: "#F0F2F5",
      BACKGROUND: "#E4E6EF",
      BUTTON: "#9f0a2f",
      BUTTON_TEXT: "#FFF",
      TEXT: "#000",
      ICON: "#333",
      PRIMARY: "#9f0a2f",
      WHITE: "#FFF",
      POST_TITLE: "#333",
      POST_CONTENT: "#555",
      OVERLAY: "rgba(0,0,0,0.6)",
      DISABLED: "#A0A0A0", // Cor para botões desativados
    },
  },
  dark: {
    COLORS: {
      BACKGROUND_CARD: "#222",
      BACKGROUND: "#111",
      BUTTON: "#800020",
      BUTTON_TEXT: "#FFF",
      TEXT: "#fff",
      ICON: "#FFF",
      PRIMARY: "#800020",
      WHITE: "#FFF",
      POST_TITLE: "#FFF",
      POST_CONTENT: "#DDD",
      OVERLAY: "rgba(0,0,0,0.8)",
      DISABLED: "#505050", // Cor para botões desativados
    },
  },
};
