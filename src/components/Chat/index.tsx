import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { estilo } from "./styles";

import * as Animatable from "react-native-animatable";
import { useTheme } from "../../context/ThemeContext";

export default function Chat() {
  const { theme } = useTheme();

  const [sintomasUsuario, setSintomasUsuario] = useState("");
  const [respostaOpenAI, setRespostaOpenAI] = useState("");
  const [carregando, setCarregando] = useState(false);

  const API_OPENAI = "https://api.openai.com/v1/chat/completions";
  const MODELO_GPT = "gpt-3.5-turbo";
  const CHAVE_GPT = "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";

  const gerarResposta = async () => {
    if (sintomasUsuario === "") {
      Alert.alert("Alerta", "Por favor, explique o que está sentindo.");
      return;
    }

    setRespostaOpenAI("");
    setCarregando(true);
    Keyboard.dismiss();

    const prompt = `Por favor, explique o que está sentindo: ${sintomasUsuario}`;

    try {
      const resposta = await fetch(API_OPENAI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CHAVE_GPT}`,
        },
        body: JSON.stringify({
          model: MODELO_GPT,
          messages: [
            {
              role: "user",
              content: `${prompt}`,
            },
          ],
          temperature: 0.2,
          max_tokens: 500,
          top_p: 1,
        }),
      });

      if (!resposta.ok) {
        throw new Error(`Erro HTTP! Status: ${resposta.status}`);
      }

      const dados = await resposta.json();
      setRespostaOpenAI(dados.choices[0].message.content);
    } catch (erro) {
      Alert.alert("Erro", "Erro ao obter resposta do servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Animatable.View animation="fadeInUp">
      <View
        style={[estilo.form, { backgroundColor: theme.COLORS.BACKGROUND_CARD }]}
      >
        <Text style={[estilo.label, { color: theme.COLORS.POST_TITLE }]}>
          Explique o que está sentindo
        </Text>
        <TextInput
          placeholder=""
          placeholderTextColor={theme.COLORS.POST_CONTENT}
          style={[estilo.input, { color: theme.COLORS.POST_CONTENT }]}
          value={sintomasUsuario}
          onChangeText={(texto) => setSintomasUsuario(texto)}
          multiline
          numberOfLines={3}
        />
        <TouchableOpacity
          style={[estilo.button, { backgroundColor: theme.COLORS.BUTTON }]}
          onPress={gerarResposta}
        >
          <Text
            style={[estilo.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            Obter resposta
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24, marginTop: 4 }}
        style={estilo.containerScroll}
        showsVerticalScrollIndicator={false}
      >
        {carregando && (
          <View
            style={[
              estilo.content,
              { backgroundColor: theme.COLORS.BACKGROUND_CARD },
            ]}
          >
            <Text style={[estilo.title, { color: theme.COLORS.POST_TITLE }]}>
              Carregando resposta...
            </Text>
            <ActivityIndicator color={theme.COLORS.ICON} size="small" />
          </View>
        )}
        {respostaOpenAI && (
          <Animatable.View animation="fadeInUp">
            <View
              style={[
                estilo.content,
                { backgroundColor: theme.COLORS.BACKGROUND_CARD },
              ]}
            >
              <Text style={[estilo.title, { color: theme.COLORS.POST_TITLE }]}>
                Resposta do Doutor:
              </Text>
              <Text
                style={{ lineHeight: 24, color: theme.COLORS.POST_CONTENT }}
              >
                {respostaOpenAI}
              </Text>
            </View>
          </Animatable.View>
        )}
      </ScrollView>
    </Animatable.View>
  );
}
