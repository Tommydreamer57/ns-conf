// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext } from 'react';
import { Text, Alert } from 'react-native';
import { StorageConsumer, StorageContext } from '../storage/StorageProvider';
import { getSessionOrSocialDay, sortSchedule, getCurrentDay, numberDays } from '../utils/sessions';
import ScheduleDay from './ScheduleDay';
import { COLORS } from '../styles/styles';

const Tab = createMaterialTopTabNavigator();

Schedule.navigationOptions = { title: "Your Schedule" };

export default function Schedule({
    navigation,
}) {
    const { schedule: { days = [] } = {} } = useContext(StorageContext);

    const todayString = new Date(Date.now()).toDateString();

    const today = days.find(({ date }) => new Date(date).toDateString() === todayString) || days[0] || {};

    return (
        <Tab.Navigator
            // tabBar={() => null}
            initialRouteName={today.day}
            tabBarOptions={{
                activeTintColor: COLORS.black,
                indicatorStyle: {
                    backgroundColor: COLORS.blue,
                },
                labelStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            {days.map(({ day, events }) => (
                <Tab.Screen
                    name={day}
                >
                    {() => (
                        <ScheduleDay
                            {...{
                                navigation,
                                events,
                            }}
                        />
                    )}
                </Tab.Screen>
            ))}
        </Tab.Navigator>
    );
}
