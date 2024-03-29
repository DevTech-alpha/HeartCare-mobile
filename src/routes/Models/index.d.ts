import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type propsNavigationStack = {
  Feed: undefined | any;
  Query: undefined | any;
  Profile: undefined | any;
  Home: undefined | any;
  SignIn: undefined | any;
  SignUp: undefined | any;
  Alert: undefined | any;
};

export type propsStack = NativeStackNavigationProp<propsNavigationStack>;
