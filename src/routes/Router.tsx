import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthStack } from './Auth.routes';
import { useAuth } from '../hooks/AuthProvider';
import { AuthTab } from './Tab.routes';


export function Router() {
    const { authData, isLoading } = useAuth();

    if (isLoading) {
        return;
    }

    return (
        <NavigationContainer independent={true}>
            {authData ? <AuthTab /> : <AuthStack />}
        </NavigationContainer>
    )
}