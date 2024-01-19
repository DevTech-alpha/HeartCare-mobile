import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AppRoutes } from './Tab.routes';
import { AuthStack } from './Auth.routes';
import { useAuth } from '../hooks/AuthProvider';


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