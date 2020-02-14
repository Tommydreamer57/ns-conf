import React from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SessionTile from '../components/SessionTile';
import { StorageConsumer } from '../storage/StorageProvider';
import styles from '../styles/styles';
import { extractSessionType, sortSchedule, isSocial, getScheduleRank, isKeynote } from '../utils/sessions';
import SocialTile from '../components/SocialTile';

export default function ScheduleDay({
    navigation,
    navigation: {
        navigate,
    },
    events = [],
    allSessions = [],
}) {
    return (
        // <StorageConsumer>
        //     {({ scheduleArray, keynotes, allSessions, socials }) => (
        <ScrollView>
            <View style={styles.view}>
                <FlatList
                    keyExtractor={({ sessionName }) => sessionName}
                    data={events}
                    renderItem={({
                        item: sessionOrSocial,
                        item: {
                            id,
                            sessiontype = '',
                            sessiontime,
                        },
                    }) => isSocial(sessionOrSocial) ? (
                        <SocialTile
                            event={sessionOrSocial}
                            navigation={navigation}
                        />
                    ) : (
                                id ? (
                                    <View
                                        style={[
                                            styles.marginBottomMedium
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.breakoutHeader,
                                                styles.marginBottomMedium,
                                            ]}
                                        >
                                            <Text style={[
                                                styles.h2,
                                                isKeynote({ sessiontype }) ?
                                                    styles.blackText
                                                    :
                                                    styles.blueText,
                                            ]} >{extractSessionType(sessionOrSocial)}</Text>
                                            <Text style={[
                                                styles.h4,
                                            ]} >{sessiontime}</Text>
                                        </View>
                                        <SessionTile
                                            navigation={navigation}
                                            session={sessionOrSocial || keynotes.find(({ sessiontype }) => sessiontype.toUpperCase() === sessiontype.toUpperCase())}
                                            addedToSchedule={true}
                                        />
                                    </View>
                                ) : (
                                        <TouchableOpacity
                                            style={[
                                                styles.emptySession,
                                                styles.marginBottomMedium,
                                            ]}
                                            onPress={() => navigate('SelectBreakout', { sessionName: sessiontype })}
                                        >
                                            <Text style={[
                                                styles.buttonText,
                                            ]}>+ {extractSessionType({ sessiontype })}</Text>
                                            <Text style={[
                                                styles.h4,
                                            ]}>{(Object.values(allSessions).find(session => session.sessiontype.toLowerCase() === sessiontype.toLowerCase()) || {}).sessiontime || ''}</Text>
                                        </TouchableOpacity>
                                    )
                            )}
                />
            </View>
        </ScrollView>
        //     )}
        // </StorageConsumer>
    );
}
