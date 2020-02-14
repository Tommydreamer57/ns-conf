import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AllSessions from './screens/AllSessions';
import AllSpeakers from './screens/AllSpeakers';
import Feedback from './screens/Feedback';
import FeedbackSelect from './screens/FeedbackSelect';
import Home from './screens/Home';
import Map from './screens/Map';
import Schedule from './screens/Schedule';
import SelectBreakout from './screens/SelectBreakout';
import SessionInfo from './screens/SessionInfo';
import SocialEvent from './screens/SocialEvent';
import SpeakerInfo from './screens/SpeakerInfo';
import { COLORS } from './styles/styles';

const views = Object.entries({
    Home,
    AllSessions,
    AllSpeakers,
    Schedule,
    SelectBreakout,
    SessionInfo,
    SpeakerInfo,
    SocialEvent,
    Feedback,
    FeedbackSelect,
    Map,
});

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                cardStyle: {
                    backgroundColor: COLORS.white,
                },
                headerStyle: {
                    backgroundColor: COLORS.white,
                },
                headerTintColor: COLORS.blue,
            }}
        >
            {views.map(([name, component]) => (
                <Stack.Screen
                    {...{
                        name,
                        component,
                        options: component.navigationOptions,
                    }}
                />
            ))}
        </Stack.Navigator>
    );
}
