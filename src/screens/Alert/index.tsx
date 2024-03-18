import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTheme } from "../../hooks/ThemeProvider";
import { estilo } from "./styles";
import { Header } from "../../components/Header";
import { AntDesign } from "@expo/vector-icons";

import FAQ from "../../components/FAQ";
import Chat from "../../components/Chat";
import { useLanguage } from "../../hooks/LanguageProvider";

export default function Alert() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const [mostrar, setmostrar] = useState(true);

  const toggleChatVisibility = () => {
    setmostrar(!mostrar);
  };

  return (
    <View
      style={[estilo.container, { backgroundColor: theme.COLORS.BACKGROUND }]}
    >
      <Header
        title={mostrar ? language.TEXTO.PESQUISA : language.TEXTO.EXPLIQUE}
      />
      {mostrar ? (
        <TouchableOpacity
          style={[
            estilo.themeToggleButton,
            { backgroundColor: theme.COLORS.BACKGROUND },
          ]}
          onPress={toggleChatVisibility}
        >
          <AntDesign name="arrowright" size={30} color={theme.COLORS.ICON} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            estilo.themeToggleButton,
            { backgroundColor: theme.COLORS.BACKGROUND },
          ]}
          onPress={toggleChatVisibility}
        >
          <AntDesign name="arrowleft" size={30} color={theme.COLORS.ICON} />
        </TouchableOpacity>
      )}
      {mostrar && <Chat />}
      {!mostrar && <FAQ />}
    </View>
  );
}
