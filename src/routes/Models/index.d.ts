import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type propsNavigationStack =  {
    Feed: undefined | any;
    Consulta: undefined | any;
    Perfil: undefined | any;
    Home: undefined | any;
    Login: undefined | any;
    Cadastrar: undefined | any;
    Principal: undefined | any;
    Mapa : undefined | any;
}

export type propsStack = NativeStackNavigationProp<propsNavigationStack>