// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext } from 'react';
import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { StorageContext } from '../storage/StorageProvider';
import styles, { COLORS } from '../styles/styles';
import ScheduleEvent from './ScheduleEvent';

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
            initialRouteName={today.day}
            tabBarOptions={{
                activeTintColor: COLORS.black,
                indicatorStyle: {
                    backgroundColor: COLORS.blue,
                },
                labelStyle: {
                    fontWeight: 'bold',
                    textTransform: "capitalize",
                },
            }}
        >
            {days.map(({ day, events }) => (
                <Tab.Screen
                    key={day}
                    name={day}
                >
                    {() => (
                        <FlatList
                            contentContainerStyle={styles.view}
                            keyExtractor={({ title }) => title}
                            data={events}
                            renderItem={({ item }) => (
                                <ScheduleEvent
                                    event={item}
                                    navigation={navigation}
                                />
                            )}
                        />
                    )}
                </Tab.Screen>
            ))}
        </Tab.Navigator>
    );
}
