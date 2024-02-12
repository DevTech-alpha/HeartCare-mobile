import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type propsNavigationStack = {
    Feed: undefined | any;
    Query: undefined | any;
    Perfil: undefined | any;
    Home: undefined | any;
    Login: undefined | any;
    Cadastrar: undefined | any;
    Principal: undefined | any;
    Search: undefined | any;
}

export type propsStack = NativeStackNavigationProp<propsNavigationStack>