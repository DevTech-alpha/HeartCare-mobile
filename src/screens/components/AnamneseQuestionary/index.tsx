import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getCardiologyQuestions } from "../../../utils/questions";
import { useTheme } from "../../../context/ThemeContext";
import { styles } from "./styles";
import * as Progress from "react-native-progress";

function AnamneseQuestionary() {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const questions = getCardiologyQuestions();
  const totalSteps = questions.length;

  const [answers, setAnswers] = useState(Array(totalSteps).fill(null));

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAnswer = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = index;
    setAnswers(newAnswers);
  };

  const progress = (currentStep + 1) / totalSteps;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.questionContainer,
          { backgroundColor: theme.COLORS.BACKGROUND_CARD },
        ]}
      >
        <Progress.Bar
          progress={progress}
          width={null}
          color={theme.COLORS.PRIMARY}
          borderColor={theme.COLORS.BACKGROUND_CARD}
          unfilledColor={theme.COLORS.BACKGROUND}
          style={{ margin: 10 }}
        />
        <Text style={[styles.questionText, { color: theme.COLORS.TEXT }]}>
          {questions[currentStep].question}
        </Text>
        {questions[currentStep].answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleAnswer(index)}
            style={[
              styles.button,
              {
                backgroundColor:
                  answers[currentStep] === index
                    ? theme.COLORS.PRIMARY
                    : theme.COLORS.BACKGROUND,
                borderColor:
                  answers[currentStep] === index
                    ? theme.COLORS.PRIMARY
                    : theme.COLORS.BACKGROUND_CARD,
              },
            ]}
          >
            <Text
              style={{
                color:
                  answers[currentStep] === index
                    ? theme.COLORS.WHITE
                    : theme.COLORS.TEXT,
              }}
            >
              {answer}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={handlePreviousStep}
          disabled={currentStep === 0}
        >
          <Text
            style={[
              styles.navigationButton,
              {
                color:
                  currentStep === 0
                    ? theme.COLORS.DISABLED
                    : theme.COLORS.PRIMARY,
              },
            ]}
          >
            Anterior
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextStep}
          disabled={currentStep === totalSteps - 1}
        >
          <Text
            style={[
              styles.navigationButton,
              {
                color:
                  currentStep === totalSteps - 1
                    ? theme.COLORS.DISABLED
                    : theme.COLORS.PRIMARY,
              },
            ]}
          >
            Próximo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default AnamneseQuestionary;
