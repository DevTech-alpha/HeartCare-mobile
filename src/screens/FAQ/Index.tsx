// FAQScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';
import * as Animatable from 'react-native-animatable';

const FAQScreen = () => {
  const [questions, setQuestions] = useState([
    { id: 1, question: 'O que é um transplante cardíaco?', answer: 'Um transplante cardíaco é a substituição de um coração doente por um coração saudável de um doador. Esse procedimento é realizado para tratar condições graves do coração, como insuficiência cardíaca avançada ou danos irreparáveis.' },
    { id: 2, question: 'Quem pode ser um candidato para um transplante cardíaco?', answer: 'Os candidatos para um transplante cardíaco são geralmente pacientes com insuficiência cardíaca grave que não respondem adequadamente a outras formas de tratamento. Avaliações médicas detalhadas são realizadas para determinar a elegibilidade.' },
    { id: 3, question: 'Quais são os riscos associados ao transplante cardíaco?', answer: 'O transplante cardíaco envolve alguns riscos, como rejeição do órgão transplantado, infecções, complicações cirúrgicas, e efeitos colaterais dos medicamentos imunossupressores. A equipe médica monitora de perto o paciente para mitigar esses riscos.' },
    { id: 4, question: 'Qual é a expectativa de vida após um transplante cardíaco?', answer: 'A expectativa de vida após um transplante cardíaco pode variar de paciente para paciente. Em geral, muitos pacientes conseguem levar vidas saudáveis por muitos anos. O acompanhamento médico contínuo e o cumprimento das orientações médicas são essenciais.' },
    { id: 5, question: 'Como é o processo de recuperação pós-transplante cardíaco?', answer: 'O processo de recuperação pós-transplante cardíaco envolve cuidados intensivos no hospital seguidos por acompanhamento ambulatorial. Os pacientes passam por reabilitação cardíaca, ajustes de medicamentos e monitoramento constante para garantir uma recuperação adequada.' },
    { id: 6, question: 'Existe algum cuidado especial necessário após o transplante?', answer: 'Sim, alguns cuidados especiais após o transplante cardíaco incluem a adesão rigorosa à medicação imunossupressora, acompanhamento médico regular, manutenção de um estilo de vida saudável, evitando fatores de risco e participação em programas de reabilitação cardíaca.' },
    { id: 7, question: 'Quais são as alternativas ao transplante cardíaco?', answer: 'Em alguns casos, alternativas ao transplante cardíaco podem incluir tratamentos médicos avançados, dispositivos de assistência ventricular, ou outras intervenções cirúrgicas. A escolha da alternativa depende da condição específica de cada paciente.' },
    { id: 8, question: 'Quais são os sintomas de rejeição após o transplante?', answer: 'Os sintomas de rejeição após o transplante cardíaco podem incluir fadiga, falta de ar, ganho de peso repentino, diminuição da função cardíaca e inchaço. É crucial relatar quaisquer sintomas à equipe médica imediatamente para avaliação e intervenção.' },
    { id: 9, question: 'É possível realizar atividades físicas após o transplante cardíaco?', answer: 'Sim, é possível realizar atividades físicas após o transplante cardíaco. No entanto, é necessário seguir orientações médicas específicas, participar de programas de reabilitação cardíaca e adaptar o nível de atividade de acordo com a condição de saúde individual.' },
    { id: 10, question: 'Quais são as complicações mais comuns pós-transplante cardíaco?', answer: 'Algumas das complicações mais comuns pós-transplante cardíaco incluem rejeição, infecções, problemas renais, hipertensão arterial, diabetes e efeitos colaterais dos medicamentos imunossupressores. A gestão adequada dessas complicações é fundamental para o bem-estar do paciente.' },
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
                  color="#333333"
                />
                <Text style={styles.questionText}>{item.question}</Text>
               
              </View>
            </TouchableOpacity>
            {selectedQuestion === item.id && (
              <Animatable.Text animation="fadeIn" style={styles.answerText}>
                {item.answer}
              </Animatable.Text>
            )}
          </Animatable.View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FAQScreen;



