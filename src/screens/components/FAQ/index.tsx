import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./styles";
import * as Animatable from "react-native-animatable";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../../context/ThemeContext";
import FAQProps from "../../../props/FAQprops";
import shadow from '../../../utils/styles/index';
import { commonQuestions } from "../../../models/FAQ";

export default function FAQ({ toggleScreen }: FAQProps) {
  const { theme } = useTheme();


  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionPress = (id) => {
    setSelectedQuestion(id === selectedQuestion ? null : id);
  };

  return (
    <View style={{ backgroundColor: theme.COLORS.BACKGROUND }}>
      <View style={styles.buttonToggleContainer}>
        <TouchableOpacity
          onPress={toggleScreen}
          style={[
            styles.buttonToggle,
            { backgroundColor: theme.COLORS.BUTTON },
          ]}
        >
          <Text
            style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            Questionário de Anamnese
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {commonQuestions.map((item) => (
          <Animatable.View
            key={item.id}
            animation="fadeInUp"
            style={[
              styles.questionContainer,
              { backgroundColor: theme.COLORS.BACKGROUND_CARD,
                ...shadow.shadowOverlay
               },
            ]}
          >
            <TouchableOpacity onPress={() => handleQuestionPress(item.id)}>
              <View
                style={[
                  styles.questionHeader,
                  { backgroundColor: theme.COLORS.BACKGROUND_CARD },
                ]}
              >
                <MaterialIcons
                  name={
                    selectedQuestion === item.id
                      ? "keyboard-arrow-up"
                      : "keyboard-arrow-down"
                  }
                  size={24}
                  color={theme.COLORS.POST_TITLE}
                />
                <Text
                  style={[
                    styles.questionText,
                    { color: theme.COLORS.POST_TITLE },
                  ]}
                >
                  {item.pergunta}
                </Text>
              </View>
            </TouchableOpacity>
            {selectedQuestion === item.id && (
              <Animatable.Text
                animation="fadeIn"
                style={[
                  styles.answerText,
                  { color: theme.COLORS.POST_CONTENT },
                ]}
              >
                {item.resposta}
              </Animatable.Text>
            )}
          </Animatable.View>
        ))}
      </ScrollView>
    </View>
  );
}
