import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getCardiologyQuestions } from "../../../utils/questions";
import { useTheme } from "../../../context/ThemeContext";
import { styles } from "./styles";

function Questionary() {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const questions = getCardiologyQuestions();
  const totalSteps = questions.length;

  const [answers, setAnswers] = useState<number[]>(
    Array(totalSteps).fill(null)
  );

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleAnswer = (index: number) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentStep] = index;
      return newAnswers;
    });
  };

  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.questionContainer,
          { backgroundColor: theme.COLORS.BACKGROUND_CARD },
        ]}
      >
        <View
          style={[
            styles.progressBar,
            { backgroundColor: theme.COLORS.PRIMARY, width: `${progress}%` },
          ]}
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

export default Questionary;
