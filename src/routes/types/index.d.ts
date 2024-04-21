import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Definindo os tipos de navegação para a stack de navegação
export type propsNavigationStack = {
  // Tipos para as telas da TabBar
  Feed: undefined | any; // Tela de feed
  Query: undefined | any; // Tela de consulta
  Profile: undefined | any; // Tela de perfil
  Info: undefined | any; // Tela de informações
  // Tipos para as telas da Stack
  Home: undefined | any; // Tela inicial
  SignIn: undefined | any; // Tela de login
  SignUp: undefined | any; // Tela de cadastro
};

// Definindo o tipo para a navegação na Stack
export type propsStack = NativeStackNavigationProp<propsNavigationStack>;
