interface Post {
    id: string;
    username: string;
    title: string;
    content: string;
  }
  
  export const data: Post[] = [
    { id: '1', username: 'Juliano', title: 'Cuidados com o Coração: Parte 1', content: 'Mantenha uma dieta saudável, rica em frutas, vegetais e grãos integrais.' },
    { id: '2', username: 'JaneSmith', title: 'Cuidados com o Coração: Parte 2', content: 'Pratique exercícios regularmente para fortalecer o coração e manter um peso saudável.' },
    { id: '3', username: 'AliceWonderland', title: 'Cuidados com o Coração: Parte 3', content: 'Evite o consumo excessivo de alimentos ricos em gorduras saturadas e trans.' },
    { id: '4', username: 'BobBuilder', title: 'Cuidados com o Coração: Parte 4', content: 'Monitore regularmente a pressão arterial e o colesterol.' },
    { id: '5', username: 'EveTheExplorer', title: 'Cuidados com o Coração: Parte 5', content: 'Mantenha um estilo de vida livre de tabaco e limite o consumo de álcool.' },
    { id: '6', username: 'AnotherUser', title: 'Cuidados com o Coração: Parte 6', content: 'Realize check-ups médicos regulares para garantir a saúde do coração.' },
];

  export default Post;
  