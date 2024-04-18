import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { styles } from "./styles";
import shadow from '../../../utils/styles/index';
import { questionary } from "../../../models/CardiologyQuestion";

export default function Questionary() {
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = questionary.length;

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
          { backgroundColor: theme.COLORS.BACKGROUND_CARD,
            ...shadow.shadowOverlay
           },
        ]}
      >
        <View
          style={[
            styles.progressBar,
            { backgroundColor: theme.COLORS.PRIMARY, width: `${progress}%` },
          ]}
        />
        <Text style={[styles.questionText, { color: theme.COLORS.TEXT }]}>
          {questionary[currentStep].question}
        </Text>
        {questionary[currentStep].answers.map((answer, index) => (
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
