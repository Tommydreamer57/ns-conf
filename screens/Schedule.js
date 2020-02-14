// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Text } from 'react-native';
import { StorageConsumer } from '../storage/StorageProvider';
import { getSessionOrSocialDay, sortSchedule, getCurrentDay, numberDays } from '../utils/sessions';
import ScheduleDay from './ScheduleDay';
import { COLORS } from '../styles/styles';

const Tab = createMaterialTopTabNavigator();

Schedule.navigationOptions = { title: "Your Schedule" };

export default function Schedule({
    navigation,
}) {
    return (
        <StorageConsumer>
            {({ scheduleArray, socials, allSessions }) => {
                const sortedSchedule = sortSchedule({
                    sessions: scheduleArray.map(({ sessionName, selectedSession }) => Object.entries(selectedSession || {}).length ?
                        selectedSession
                        :
                        {
                            sessionName,
                            sessiontype: sessionName,
                        }),
                    socials,
                });
                const groupedSchedule = sortedSchedule.reduce((grouped, sessionOrSocial) => {
                    const day = getSessionOrSocialDay(sessionOrSocial) || 'empty';
                    const { [day]: prev = [] } = grouped;
                    return {
                        ...grouped,
                        [day]: prev.concat(sessionOrSocial),
                    };
                }, {});
                const days = Object.keys(groupedSchedule);
                if (!days.length) return null;
                const today = getCurrentDay();
                const initialDay = today in groupedSchedule ? today : days[0];
                return (
                    <Tab.Navigator
                        // tabBar={() => null}
                        initialRouteName={initialDay}
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
                        {Object.entries(groupedSchedule)
                            .sort(([a], [b]) => (
                                numberDays.indexOf(a)
                                -
                                numberDays.indexOf(b)
                            ))
                            .map(([day, events]) => (
                                <Tab.Screen
                                    name={day}
                                >
                                    {() => (
                                        <ScheduleDay
                                            {...{
                                                navigation,
                                                events,
                                                allSessions,
                                            }}
                                        />
                                    )}
                                </Tab.Screen>
                            ))}
                    </Tab.Navigator>
                )
            }}
        </StorageConsumer>
    );
}

// export default function Schedule({
//     navigation,
//     navigation: {
//         navigate,
//     },
// }) {
//     return (
//         <StorageConsumer>
//             {({ scheduleArray, keynotes, allSessions }) => (
//                 <ScrollView>
//                     <View style={styles.view}>
//                         <FlatList
//                             keyExtractor={({ sessionName }) => sessionName}
//                             data={scheduleArray}
//                             renderItem={({
//                                 item: {
//                                     sessionName,
//                                     selectedSession,
//                                     selectedSession: {
//                                         id,
//                                         sessiontime,
//                                     } = {},
//                                 },
//                                 index,
//                             }) => (
//                                     <View>
//                                         {index === 0 ? (
//                                             <Text style={[
//                                                 styles.title,
//                                                 styles.marginBottomXLarge,
//                                             ]}>Friday</Text>
//                                         ) : index === 5 ? (
//                                             <Text style={[
//                                                 styles.title,
//                                                 styles.marginBottomXLarge,
//                                             ]}>Saturday</Text>
//                                         ) : null}
//                                         {id ? (
//                                             <View
//                                                 style={[
//                                                     styles.marginBottomMedium
//                                                 ]}
//                                             >
//                                                 <View
//                                                     style={[
//                                                         styles.breakoutHeader,
//                                                         styles.marginBottomMedium,
//                                                     ]}
//                                                 >
//                                                     <Text style={[
//                                                         styles.h2,
//                                                     ]} >{extractSessionType(selectedSession)}</Text>
//                                                     <Text style={[
//                                                         styles.h4,
//                                                     ]} >{sessiontime}</Text>
//                                                 </View>
//                                                 <SessionTile
//                                                     navigation={navigation}
//                                                     session={selectedSession || keynotes.find(({ sessiontype }) => sessiontype.toUpperCase() === sessionName.toUpperCase())}
//                                                     addedToSchedule={true}
//                                                 />
//                                             </View>
//                                         ) : (
//                                                 <TouchableOpacity
//                                                     style={[
//                                                         styles.emptySession,
//                                                         styles.marginBottomMedium,
//                                                     ]}
//                                                     onPress={() => navigate('SelectBreakout', { sessionName })}
//                                                 >
//                                                     <Text style={[
//                                                         styles.buttonText,
//                                                     ]}>+ {extractSessionType({ sessiontype: sessionName })}</Text>
//                                                     <Text style={[
//                                                         styles.h4,
//                                                     ]}>{(Object.values(allSessions).find(({ sessiontype }) => sessiontype.toLowerCase() === sessionName.toLowerCase()) || {}).sessiontime || ''}</Text>
//                                                 </TouchableOpacity>
//                                             )}
//                                     </View>
//                                 )}
//                         />
//                     </View>
//                 </ScrollView>
//             )}
//         </StorageConsumer>
//     );
// }
