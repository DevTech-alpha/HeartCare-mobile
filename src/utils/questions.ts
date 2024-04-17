export const getCardiologyQuestions = () => {
  return [
      {
          question: 'Você já teve algum episódio de dor no peito ou desconforto torácico?',
          answers: [
              'Sim, há um ano',
              'Sim, há menos de um ano',
              'Sim, há mais de um ano',
              'Não tenho certeza'
          ],
          correctAnswerIndexes: [0, 1, 2, 3]
      },
      {
          question: 'Você já foi diagnosticado com alguma condição cardíaca, como hipertensão arterial, doença coronariana, arritmia cardíaca, insuficiência cardíaca ou outras?',
          answers: [
              'Sim',
              'Não',
              'Não tenho certeza'
          ],
          correctAnswerIndexes: [0, 1, 2]
      },
      {
          question: 'Você já fez algum procedimento cardíaco, como angioplastia, colocação de stent, ou cirurgia cardíaca?',
          answers: [
              'Sim',
              'Não',
              'Não tenho certeza'
          ],
          correctAnswerIndexes: [0, 1, 2]
      },
      {
          question: 'Você tem histórico familiar de doenças cardíacas, como infarto do miocárdio, doença arterial coronariana, ou outras?',
          answers: [
              'Sim',
              'Não',
              'Não tenho certeza'
          ],
          correctAnswerIndexes: [0, 1, 2]
      },
      {
          question: 'Você fuma atualmente?',
          answers: [
              'Sim',
              'Não',
              'Não tenho certeza'
          ],
          correctAnswerIndexes: [0, 1, 2]
      },
      {
          question: 'Você consome bebidas alcoólicas regularmente?',
          answers: [
              'Sim',
              'Não',
              'Não tenho certeza'
          ],
          correctAnswerIndexes: [0, 1, 2]
      },
      {
          question: 'Você pratica exercícios físicos regularmente?',
          answers: [
              'Sim',
              'Não',
              'Não tenho certeza'
          ],
          correctAnswerIndexes: [0, 1, 2]
      },
      {
          question: 'Você segue uma dieta balanceada e com baixo teor de gordura?',
          answers: [
              'Sim',
              'Não',
              'Não tenho certeza'
          ],
          correctAnswerIndexes: [0, 1, 2]
      },
      {
          question: 'Você está atualmente sob tratamento médico para alguma condição cardíaca?',
          answers: [
              'Sim',
              'Não',
              'Não tenho certeza'
          ],
          correctAnswerIndexes: [0, 1, 2]
      },
      {
          question: 'Você já teve algum episódio de desmaio ou síncope?',
          answers: [
              'Sim',
              'Não',
              'Não tenho certeza'
          ],
          correctAnswerIndexes: [0, 1, 2]
      },
      {
          question: 'Você já teve algum episódio de falta de ar inexplicável ou dificuldade para respirar?',
          answers: [
              'Sim',
              'Não',
              'Não tenho certeza'
          ],
          correctAnswerIndexes: [0, 1, 2]
      }
  ];
};
