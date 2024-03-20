import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./styles";
import * as Animatable from "react-native-animatable";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";


const FAQ = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const [questionsPortugues] = useState([
    {
      id: 1,
      pergunta: "O que é saúde cardiovascular?",
      resposta:
        "A saúde cardiovascular refere-se ao bem-estar do coração e dos vasos sanguíneos, envolvendo práticas que promovem a prevenção de doenças cardíacas.",
    },
    {
      id: 2,
      pergunta: "Quais são os hábitos alimentares saudáveis para o coração?",
      resposta:
        "Uma dieta equilibrada, rica em frutas, vegetais, grãos integrais e com baixo teor de gorduras saturadas, ajuda a manter a saúde do coração e a reduzir o risco de doenças cardíacas.",
    },
    {
      id: 3,
      pergunta: "Como a atividade física contribui para a saúde cardíaca?",
      resposta:
        "A prática regular de exercícios fortalece o coração, melhora a circulação sanguínea, controla a pressão arterial e reduz os níveis de colesterol, promovendo a saúde cardiovascular.",
    },
    {
      id: 4,
      pergunta: "Quais são os sinais de alerta de problemas cardíacos?",
      resposta:
        "Sintomas como dor no peito, falta de ar, palpitações e fadiga inexplicável podem indicar problemas cardíacos. Consultar um profissional de saúde é fundamental diante desses sinais.",
    },
    {
      id: 5,
      pergunta: "Qual é a importância do controle do estresse para o coração?",
      resposta:
        "O estresse crônico pode impactar negativamente o coração. Estratégias de gerenciamento do estresse, como meditação e atividades relaxantes, são benéficas para a saúde cardiovascular.",
    },
    {
      id: 6,
      pergunta: "Como a qualidade do sono afeta o coração?",
      resposta:
        "Um sono adequado é vital para a recuperação do coração. A falta de sono pode contribuir para o desenvolvimento de condições cardíacas, sendo essencial manter uma rotina de sono saudável.",
    },
    {
      id: 7,
      pergunta: "Quais são os benefícios da manutenção de um peso saudável?",
      resposta:
        "Manter um peso adequado reduz a carga sobre o coração, diminui o risco de doenças cardíacas e contribui para a saúde geral do sistema cardiovascular.",
    },
    {
      id: 8,
      pergunta: "Como a cessação do tabagismo impacta a saúde do coração?",
      resposta:
        "Parar de fumar beneficia diretamente a saúde do coração, reduzindo o risco de doenças cardiovasculares. Os benefícios começam a ser notados logo após a cessação do hábito.",
    },
    {
      id: 9,
      pergunta:
        "Quais são os exames de rotina essenciais para monitorar a saúde cardíaca?",
      resposta:
        "Exames como o check-up anual, a medição da pressão arterial, a análise do colesterol e exames específicos, quando indicados, são fundamentais para monitorar a saúde do coração.",
    },
    {
      id: 10,
      pergunta: "Como a genética influencia a saúde cardiovascular?",
      resposta:
        "A predisposição genética pode influenciar o risco de doenças cardíacas. Compreender a história familiar e realizar avaliações médicas regulares são passos importantes para um cuidado preventivo.",
    },
  ]);
  const [questionsIngles] = useState([
    {
      id: 1,
      question: "What is cardiovascular health?",
      answer:
        "Cardiovascular health refers to the well-being of the heart and blood vessels, involving practices that promote the prevention of heart diseases.",
    },
    {
      id: 2,
      question: "What are healthy eating habits for the heart?",
      answer:
        "A balanced diet, rich in fruits, vegetables, whole grains, and low in saturated fats, helps maintain heart health and reduce the risk of heart diseases.",
    },
    {
      id: 3,
      question: "How does physical activity contribute to heart health?",
      answer:
        "Regular exercise strengthens the heart, improves blood circulation, controls blood pressure, and reduces cholesterol levels, promoting cardiovascular health.",
    },
    {
      id: 4,
      question: "What are the warning signs of heart problems?",
      answer:
        "Symptoms such as chest pain, shortness of breath, palpitations, and unexplained fatigue may indicate heart problems. Consulting a healthcare professional is essential when facing these signs.",
    },
    {
      id: 5,
      question: "What is the importance of stress management for the heart?",
      answer:
        "Chronic stress can negatively impact the heart. Stress management strategies, such as meditation and relaxing activities, are beneficial for cardiovascular health.",
    },
    {
      id: 6,
      question: "How does sleep quality affect the heart?",
      answer:
        "Adequate sleep is vital for heart recovery. Lack of sleep can contribute to the development of heart conditions, so it is essential to maintain a healthy sleep routine.",
    },
    {
      id: 7,
      question: "What are the benefits of maintaining a healthy weight?",
      answer:
        "Maintaining a proper weight reduces the burden on the heart, lowers the risk of heart diseases, and contributes to the overall health of the cardiovascular system.",
    },
    {
      id: 8,
      question: "How does quitting smoking impact heart health?",
      answer:
        "Quitting smoking directly benefits heart health by reducing the risk of cardiovascular diseases. The benefits begin to be noticed shortly after cessation of the habit.",
    },
    {
      id: 9,
      question: "What are the essential routine tests to monitor heart health?",
      answer:
        "Tests such as annual check-ups, blood pressure measurement, cholesterol analysis, and specific tests when indicated are fundamental for monitoring heart health.",
    },
    {
      id: 10,
      question: "How does genetics influence cardiovascular health?",
      answer:
        "Genetic predisposition can influence the risk of heart diseases. Understanding family history and undergoing regular medical assessments are important steps for preventive care.",
    },
  ]);

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionPress = (id: any) => {
    setSelectedQuestion(id === selectedQuestion ? null : id);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.COLORS.BACKGROUND,
        },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {language.TEXTO.PERGUNTAS === "PORTUGUES" &&
          questionsPortugues.map((item) => (
            <Animatable.View
              key={item.id}
              animation="fadeInUp"
              style={[
                styles.questionContainer,
                {
                  backgroundColor: theme.COLORS.BACKGROUND_CARD,
                },
              ]}
            >
              <TouchableOpacity onPress={() => handleQuestionPress(item.id)}>
                <View
                  style={[
                    styles.questionHeader,
                    {
                      backgroundColor: theme.COLORS.BACKGROUND_CARD,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.questionText,
                      {
                        color: theme.COLORS.POST_TITLE,
                      },
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
                    {
                      color: theme.COLORS.POST_CONTENT,
                    },
                  ]}
                >
                  {item.resposta}
                </Animatable.Text>
              )}
            </Animatable.View>
          ))}
        {language.TEXTO.PERGUNTAS === "INGLES" &&
          questionsIngles.map((item) => (
            <Animatable.View
              key={item.id}
              animation="fadeInUp"
              style={[
                styles.questionContainer,
                {
                  backgroundColor: theme.COLORS.BACKGROUND_CARD,
                },
              ]}
            >
              <TouchableOpacity onPress={() => handleQuestionPress(item.id)}>
                <View
                  style={[
                    styles.questionHeader,
                    {
                      backgroundColor: theme.COLORS.BACKGROUND_CARD,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.questionText,
                      {
                        color: theme.COLORS.POST_TITLE,
                      },
                    ]}
                  >
                    {item.question}
                  </Text>
                </View>
              </TouchableOpacity>
              {selectedQuestion === item.id && (
                <Animatable.Text
                  animation="fadeIn"
                  style={[
                    styles.answerText,
                    {
                      color: theme.COLORS.POST_CONTENT,
                    },
                  ]}
                >
                  {item.answer}
                </Animatable.Text>
              )}
            </Animatable.View>
          ))}
      </ScrollView>
    </View>
  );
};

export default FAQ;
