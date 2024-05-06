import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type propsNavigationStack = {
  Feed: undefined | any; // Tela de feed
  Query: undefined | any; // Tela de consulta
  Profile: undefined | any; // Tela de perfil
  Duvidas: undefined | any; // Tela de informações

  // Tipos para as telas da Stack

  Home: undefined | any; // Tela inicial
  SignIn: undefined | any; // Tela de login
  SignUp: undefined | any; // Tela de cadastro
};

export type propsStack = NativeStackNavigationProp<propsNavigationStack>;
