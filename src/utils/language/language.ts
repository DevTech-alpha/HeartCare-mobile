export interface Language {
  TEXTO: {
    PESQUISA: string;
    EXPLIQUE: string;
    ATIVIDADES: string;
    TEMPO_DO_EXERCICIO: string;
    TEMPO_EM_MINUTOS: string;
    REGISTRAR: string;
    MENSAGEM_TEMPO: string;
    MENSAGEM_TEMPO_MAIOR: string;
    ADICIONADO_COM_SUCESSO: string;
    TEMPO: string;
    EXPLIQUE_SENTIMENTO: string;
    ALERTA: string;
    ERRO: string;
    ERRO_REPOSTA: string;
    EXPLIQUE_O_QUE_ESTA_SENTINDO: string;
    DESCREVA_SEUS_SINTOMAS: string;
    OBTER_REPOSTA: string;
    CARREGANDO_REPOSTA: string;
    RESPOSTA_DO_DOCTOR: string;
    PERGUNTAS: string;
    ERRO_MEDICAO: string;
    VALORES_INVALIDOS: string;
    SISTOLICA: string;
    DIASTOLICA: string;
    PULSO: string;
    DIGITE_SISTOLICA: string;
    DIGITE_DIASTOLICA: string;
    DIGITE_PULSO: string;
    PRESSAO_BAIXA: string;
    PRESSAO_NORMAL: string;
    PRE_HIPERTENSAO: string;
    HIPERTENSAO_ESTAGIO_1: string;
    HIPERTENSAO_ESTAGIO_2: string;
    PRESSAO_NAO_CLASSIFICADA: string;
    EDITAR: string;
    EXCLUIR: string;
    HORARIO: string;
    DATA: string;
    AVALIACAO: string;
    SALVAR: string;
    NOVA_PUBLICACAO: string;
    TITULO: string;
    CONTEUDO: string;
    POSTAR: string;
    PRENCHA_CAMPOS: string;
    RECUPERAR_SENHA: string;
    DIGITE_EMAIL: string;
    RECUPERAR_SENHA_BOTAO: string;
    VOLTAR_LOGIN: string;
    SENHA: string; // Adição
    DIGITE_SUA_SENHA: string; // Adição
    CONFIRME_A_SENHA: string; // Adição
    DIGITE_NOVAMENTE_A_SENHA: string; // Adição
    JA_TEM_UMA_CONTA: string; // Adição
    REGISTRE_SE: string; // Adição
    CONFIRME_SUA_SENHA: string; // Adição
    PERFIL_DO_USUARIO: string; // Adição
    MEU_PERFIL: string; // Adição
    SAIR: string; // Adição
    USUARIO: string;
    NOME: string;
    SOBRENOME: string;
    DATA_DE_NASCIMENTO: string;
    TIPO_SANGUINEO: string;
    DOENCA_OU_INCAPACIDADE: string;
    EMAIL: string;
    DIGITE_SEU_USUARIO: string;
    DIGITE_SEU_NOME: string;
    DIGITE_SEU_SOBRENOME: string;
    DIGITE_SUA_DATA_DE_NASCIMENTO: string;
    DIGITE_SEU_EMAIL: string;
    SALVAR_PERFIL: string;
    DIGITE_SENHA: string;
    OCULTAR_SENHA: string;
    MOSTRAR_SENHA: string;
    ACESSAR: string;
    ESQUECEU_SENHA: string;
    NAO_POSSUI_CONTA: string;
    DIGITE_SUA_CONFIRMACAO_DE_SENHA: string;
    CUIDE_CORACAO: string;
    PERFIL: string;
    EXCLUIDO: string;
    HISTORICO: string;
    NENHUMA_PUBLICACAO_ENCONTRADA: string;
    NENHUMA_MEDICAO: string;
    CANCELAR: string;
    EDITAR_USUARIO: string;
    COMPLETE_CADASTRO: string;
    BEM_VINDO: string;
    CADASTRO: string;
  };
}

export const languages: { PORTUGUES: Language; INGLES: Language } = {
  PORTUGUES: {
    TEXTO: {
      PESQUISA: "Pesquisa",
      EXPLIQUE: "Explique",
      ATIVIDADES: "Atividades",
      TEMPO_DO_EXERCICIO: "Tempo do Exercício",
      TEMPO_EM_MINUTOS: "Tempo (minutos)",
      REGISTRAR: "Registrar",
      MENSAGEM_TEMPO: "Por favor, selecione uma atividade e insira o tempo.",
      MENSAGEM_TEMPO_MAIOR:
        "O tempo deve ser maior que 0 e menor ou igual a 120 minutos.",
      ADICIONADO_COM_SUCESSO: "Adicionado com sucesso!!",
      TEMPO: "Tempo",
      EXPLIQUE_SENTIMENTO:
        "Explique o que está sentindo para receber uma resposta.",
      ALERTA: "Alerta",
      ERRO: "Erro",
      ERRO_REPOSTA:
        "Ocorreu um erro ao obter a resposta. Tente novamente mais tarde.",
      EXPLIQUE_O_QUE_ESTA_SENTINDO: "Explique o que está sentindo",
      DESCREVA_SEUS_SINTOMAS: "Descreva seus sintomas",
      OBTER_REPOSTA: "Obter Resposta",
      CARREGANDO_REPOSTA: "Carregando resposta...",
      RESPOSTA_DO_DOCTOR: "Resposta do DoctorHeart",
      PERGUNTAS: "PORTUGUES",
      ERRO_MEDICAO:
        "Erro ao adicionar medição. Consulte o console para mais detalhes.",
      VALORES_INVALIDOS:
        "Valores inválidos. Certifique-se de inserir números válidos para pressão sistólica e diastólica.",
      SISTOLICA: "Sistólica",
      DIASTOLICA: "Diastólica",
      PULSO: "Pulso",
      DIGITE_SISTOLICA: "Digite a pressão sistólica",
      DIGITE_DIASTOLICA: "Digite a pressão diastólica",
      DIGITE_PULSO: "Digite o pulso",
      PRESSAO_BAIXA: "Pressão Baixa",
      PRESSAO_NORMAL: "Pressão Normal",
      PRE_HIPERTENSAO: "Pré-Hipertensão",
      HIPERTENSAO_ESTAGIO_1: "Hipertensão Estágio 1",
      HIPERTENSAO_ESTAGIO_2: "Hipertensão Estágio 2",
      PRESSAO_NAO_CLASSIFICADA: "Pressão Não Classificada",
      EDITAR: "Editar",
      EXCLUIR: "Excluir",
      HORARIO: "Horário",
      DATA: "Data",
      AVALIACAO: "Avaliação",
      SALVAR: "Salvar",
      PRENCHA_CAMPOS: "Por favor, preencha todos os campos.",
      NOVA_PUBLICACAO: "Nova Publicação",
      TITULO: "Título",
      CONTEUDO: "Conteúdo",
      POSTAR: "Postar",
      RECUPERAR_SENHA: "Recuperar Senha",
      DIGITE_EMAIL: "Digite seu Email para recuperação",
      RECUPERAR_SENHA_BOTAO: "Recuperar Senha",
      VOLTAR_LOGIN: "Voltar para o login",
      USUARIO: "Usuário",
      DIGITE_SEU_USUARIO: "Digite seu nome de usuário",
      SENHA: "Senha",
      DIGITE_SUA_SENHA: "Digite sua senha",
      CONFIRME_A_SENHA: "Confirme a senha",
      DIGITE_NOVAMENTE_A_SENHA: "Digite novamente a senha",
      JA_TEM_UMA_CONTA: "Já tem uma conta?",
      REGISTRE_SE: "Registre-se",
      CONFIRME_SUA_SENHA: "Confirme sua senha",
      PERFIL_DO_USUARIO: "Perfil do Usuário",
      MEU_PERFIL: "Meu Perfil",
      SAIR: "Sair",
      NOME: "Nome",
      SOBRENOME: "Sobrenome",
      DATA_DE_NASCIMENTO: "Data de Nascimento",
      TIPO_SANGUINEO: "Tipo Sanguíneo",
      DOENCA_OU_INCAPACIDADE: "Doença ou Incapacidade",
      EMAIL: "E-mail",
      DIGITE_SEU_NOME: "Digite seu nome",
      DIGITE_SEU_SOBRENOME: "Digite seu sobrenome",
      DIGITE_SUA_DATA_DE_NASCIMENTO: "Digite sua data de nascimento",
      DIGITE_SEU_EMAIL: "Digite seu e-mail",
      SALVAR_PERFIL: "Salvar Perfil",
      DIGITE_SENHA: "Digite sua senha",
      OCULTAR_SENHA: "Ocultar senha",
      MOSTRAR_SENHA: "Mostrar senha",
      ACESSAR: "Acessar",
      ESQUECEU_SENHA: "Esqueceu a senha?",
      NAO_POSSUI_CONTA: "Não possui uma conta?",
      DIGITE_SUA_CONFIRMACAO_DE_SENHA: "Digite sua confirmação de senha",
      CUIDE_CORACAO: "Cuide do seu coração, a sinfonia da vida agradece.",
      PERFIL: "Perfíl",
      EXCLUIDO: "Excluido",
      HISTORICO: "Histórico",
      NENHUMA_PUBLICACAO_ENCONTRADA: "Nenhuma publicação",
      NENHUMA_MEDICAO: "Nenhuma medição encontrada",
      CANCELAR: "Cancelar",
      EDITAR_USUARIO: "Editar Perfil",
      COMPLETE_CADASTRO: "Complete seu cadastro antes de fazer a publicação.",
      BEM_VINDO: "Bem-vindo(a)",
      CADASTRO: "Faça seu cadastro",
    },
  },
  INGLES: {
    TEXTO: {
      PESQUISA: "Search",
      EXPLIQUE: "FAQ",
      ATIVIDADES: "activities",
      TEMPO_DO_EXERCICIO: "Exercise Time",
      TEMPO_EM_MINUTOS: "Time (minutes)",
      REGISTRAR: "Register",
      MENSAGEM_TEMPO: "Please select an activity and enter the time.",
      MENSAGEM_TEMPO_MAIOR:
        "The time must be greater than 0 and less than or equal to 120 minutes.",
      ADICIONADO_COM_SUCESSO: "Added successfully!!",
      TEMPO: "Time",
      EXPLIQUE_SENTIMENTO:
        "Explain what you are feeling to receive a response.",
      ALERTA: "Alert",
      ERRO: "Error",
      ERRO_REPOSTA:
        "An error occurred while retrieving the response. Try again later.",
      EXPLIQUE_O_QUE_ESTA_SENTINDO: "Explain what you are feeling",
      DESCREVA_SEUS_SINTOMAS: "Describe your symptoms",
      OBTER_REPOSTA: "Get Answer",
      CARREGANDO_REPOSTA: "Loading response...",
      RESPOSTA_DO_DOCTOR: "DoctorHeart's response",
      PERGUNTAS: "INGLES",
      ERRO_MEDICAO: "Error adding measurement. See console for details.",
      VALORES_INVALIDOS:
        "Invalid values. Make sure you enter valid numbers for systolic and diastolic pressure.",
      SISTOLICA: "Systolic",
      DIASTOLICA: "Diastolic",
      PULSO: "Pulse",
      DIGITE_SISTOLICA: "Enter systolic pressure",
      DIGITE_DIASTOLICA: "Enter diastolic pressure",
      DIGITE_PULSO: "Enter pulse",
      PRESSAO_BAIXA: "Low Blood Pressure",
      PRESSAO_NORMAL: "Normal Blood Pressure",
      PRE_HIPERTENSAO: "Prehypertension",
      HIPERTENSAO_ESTAGIO_1: "Stage 1 Hypertension",
      HIPERTENSAO_ESTAGIO_2: "Stage 2 Hypertension",
      PRESSAO_NAO_CLASSIFICADA: "Unclassified Blood Pressure",
      EDITAR: "Edit",
      EXCLUIR: "Delete",
      HORARIO: "Time",
      DATA: "Date",
      AVALIACAO: "Evaluation",
      SALVAR: "Save",
      PRENCHA_CAMPOS: "Please fill in all the fields.",
      NOVA_PUBLICACAO: "New Publication",
      TITULO: "Title",
      CONTEUDO: "Content",
      POSTAR: "Post",
      RECUPERAR_SENHA: "Reset Password",
      DIGITE_EMAIL: "Enter your email for recovery",
      RECUPERAR_SENHA_BOTAO: "Reset Password",
      VOLTAR_LOGIN: "Back to login",
      USUARIO: "User",
      DIGITE_SEU_USUARIO: "Enter your username",
      SENHA: "Password",
      DIGITE_SUA_SENHA: "Enter your password",
      CONFIRME_A_SENHA: "Confirm password",
      DIGITE_NOVAMENTE_A_SENHA: "Enter password again",
      JA_TEM_UMA_CONTA: "Already have an account?",
      REGISTRE_SE: "Sign Up",
      CONFIRME_SUA_SENHA: "Confirm your password",
      PERFIL_DO_USUARIO: "User Profile",
      MEU_PERFIL: "My Profile",
      SAIR: "Logout",
      NOME: "Name",
      SOBRENOME: "Last Name",
      DATA_DE_NASCIMENTO: "Date of Birth",
      TIPO_SANGUINEO: "Blood Type",
      DOENCA_OU_INCAPACIDADE: "Medical Condition or Disability",
      EMAIL: "Email",
      DIGITE_SEU_NOME: "Enter your name",
      DIGITE_SEU_SOBRENOME: "Enter your last name",
      DIGITE_SUA_DATA_DE_NASCIMENTO: "Enter your date of birth",
      DIGITE_SEU_EMAIL: "Enter your email",
      SALVAR_PERFIL: "Save Profile",
      DIGITE_SENHA: "Enter your password",
      OCULTAR_SENHA: "Hide password",
      MOSTRAR_SENHA: "Show password",
      ACESSAR: "Sign in",
      ESQUECEU_SENHA: "Forgot password?",
      NAO_POSSUI_CONTA: "Don't have an account?",
      DIGITE_SUA_CONFIRMACAO_DE_SENHA: "Enter your password confirmation",
      CUIDE_CORACAO:
        "Take care of your heart, the symphony of life thanks you.",
      PERFIL: "Profile",
      EXCLUIDO: "Deleted",
      HISTORICO: "Historic",
      NENHUMA_PUBLICACAO_ENCONTRADA: "No publications found",
      NENHUMA_MEDICAO: "No measurements found",
      CANCELAR: "Cancel",
      EDITAR_USUARIO: "Edit Profile",
      COMPLETE_CADASTRO: "Complete your registration before publishing.",
      BEM_VINDO: "Welcome to",
      CADASTRO: "SignUp",
    },
  },
};