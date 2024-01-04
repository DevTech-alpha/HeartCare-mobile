import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAuth } from '../hooks/Auth';
import { AppRoutes } from './Tab.routes';
import { AuthStack } from './Auth.routes';


export function Router(){
    const {authData, isLoading} = useAuth();
    
    if(isLoading){
        return;
    }

    return(
        <NavigationContainer independent={true}>
            {authData ? <AppRoutes/> : <AuthStack/> }
        </NavigationContainer>
    )
}