// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import ScheduleEvent from '../components/ScheduleEvent';
import { StorageContext } from '../storage/StorageProvider';
import styles, { COLORS } from '../styles/styles';
import { Alert } from 'react-native';

const Tab = createMaterialTopTabNavigator();

Schedule.navigationOptions = { title: "Your Schedule" };

export default function Schedule({
    navigation,
}) {
    const { schedule: { days = [] } = {} } = useContext(StorageContext);

    const todayDate = new Date(Date.now()).getDay();

    const today = days.find(({ date }) => new Date(date).getDay() === todayDate) || days[0] || {};

    // Alert.alert(`Today: ${today.day}, days: ${days.map(({ day }) => day).join(', ')}`);

    return (
        <Tab.Navigator
            initialRouteName={today.day || 'unknown'}
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
            {days.length ?
                days.map(({ day, events }) => (
                    <Tab.Screen
                        key={day}
                        name={day || 'unknown'}
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
                ))
                :
                (
                    <Tab.Screen
                        name="unknown"
                    >
                        {() => null}
                    </Tab.Screen>
                )}
        </Tab.Navigator>
    );
}
