
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { propsNavigationStack } from './Models';

import Home from '../screens/Home';
import Login from '../screens/SignIn';
import Cadastrar from '../screens/SignUp';

const { Screen, Navigator } = createNativeStackNavigator<propsNavigationStack>();

export function StackRoutes() {

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Screen
                name="Cadastrar"
                component={Cadastrar}
                options={{ headerShown: false }}
            />
        </Navigator>
    )
}