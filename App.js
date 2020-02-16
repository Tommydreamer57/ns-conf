import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Navigation from './Navigation';
import StorageProvider from './storage/StorageProvider';

export default function App() {
    return (
        <NavigationContainer>
            <StorageProvider>
                <Navigation />
            </StorageProvider>
        </NavigationContainer>
    );
}
