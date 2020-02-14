import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppNavigator from './AppNavigator';
import StorageProvider from './storage/StorageProvider';

export default function App() {
    return (
        <NavigationContainer>
            <StorageProvider>
                <AppNavigator />
            </StorageProvider>
        </NavigationContainer>
    );
}
