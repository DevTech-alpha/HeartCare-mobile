
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';
import * as Animatable from 'react-native-animatable';

function FAQScreen() {
  const [questions] = useState([
    {
      id: 1,
      pergunta: 'O que é saúde cardiovascular?',
      resposta: 'A saúde cardiovascular refere-se ao bem-estar do coração e dos vasos sanguíneos, envolvendo práticas que promovem a prevenção de doenças cardíacas.'
    },
    {
      id: 2,
      pergunta: 'Quais são os hábitos alimentares saudáveis para o coração?',
      resposta: 'Uma dieta equilibrada, rica em frutas, vegetais, grãos integrais e com baixo teor de gorduras saturadas, ajuda a manter a saúde do coração e a reduzir o risco de doenças cardíacas.'
    },
    {
      id: 3,
      pergunta: 'Como a atividade física contribui para a saúde cardíaca?',
      resposta: 'A prática regular de exercícios fortalece o coração, melhora a circulação sanguínea, controla a pressão arterial e reduz os níveis de colesterol, promovendo a saúde cardiovascular.'
    },
    {
      id: 4,
      pergunta: 'Quais são os sinais de alerta de problemas cardíacos?',
      resposta: 'Sintomas como dor no peito, falta de ar, palpitações e fadiga inexplicável podem indicar problemas cardíacos. Consultar um profissional de saúde é fundamental diante desses sinais.'
    },
    {
      id: 5,
      pergunta: 'Qual é a importância do controle do estresse para o coração?',
      resposta: 'O estresse crônico pode impactar negativamente o coração. Estratégias de gerenciamento do estresse, como meditação e atividades relaxantes, são benéficas para a saúde cardiovascular.'
    },
    {
      id: 6,
      pergunta: 'Como a qualidade do sono afeta o coração?',
      resposta: 'Um sono adequado é vital para a recuperação do coração. A falta de sono pode contribuir para o desenvolvimento de condições cardíacas, sendo essencial manter uma rotina de sono saudável.'
    },
    {
      id: 7,
      pergunta: 'Quais são os benefícios da manutenção de um peso saudável?',
      resposta: 'Manter um peso adequado reduz a carga sobre o coração, diminui o risco de doenças cardíacas e contribui para a saúde geral do sistema cardiovascular.'
    },
    {
      id: 8,
      pergunta: 'Como a cessação do tabagismo impacta a saúde do coração?',
      resposta: 'Parar de fumar beneficia diretamente a saúde do coração, reduzindo o risco de doenças cardiovasculares. Os benefícios começam a ser notados logo após a cessação do hábito.'
    },
    {
      id: 9,
      pergunta: 'Quais são os exames de rotina essenciais para monitorar a saúde cardíaca?',
      resposta: 'Exames como o check-up anual, a medição da pressão arterial, a análise do colesterol e exames específicos, quando indicados, são fundamentais para monitorar a saúde do coração.'
    },
    {
      id: 10,
      pergunta: 'Como a genética influencia a saúde cardiovascular?',
      resposta: 'A predisposição genética pode influenciar o risco de doenças cardíacas. Compreender a história familiar e realizar avaliações médicas regulares são passos importantes para um cuidado preventivo.'
    }
  ]);


  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionPress = (id: any) => {
    setSelectedQuestion(id === selectedQuestion ? null : id);
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Perguntas Frequentes</Text>
      </Animatable.View>
      <ScrollView>

        {questions.map((item) => (
          <Animatable.View
            key={item.id}
            animation="fadeInUp"
            style={styles.questionContainer}
          >
            <TouchableOpacity
              style={styles.questionTouchable}
              onPress={() => handleQuestionPress(item.id)}
            >
              <View style={styles.questionHeader}>
                <Icon
                  name={selectedQuestion === item.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#333333" />
                <Text style={styles.questionText}>{item.pergunta}</Text>

              </View>
            </TouchableOpacity>
            {selectedQuestion === item.id && (
              <Animatable.Text animation="fadeIn" style={styles.answerText}>
                {item.resposta}
              </Animatable.Text>
            )}
          </Animatable.View>
        ))}
      </ScrollView>
    </View>
  );
}

export default FAQScreen;



