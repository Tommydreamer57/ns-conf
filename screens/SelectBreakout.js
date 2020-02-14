import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import SessionTile from '../components/SessionTile';
import { StorageConsumer } from '../storage/StorageProvider';
import styles from '../styles/styles';
import { extractSessionType } from '../utils/sessions';

SelectBreakout.navigationOptions = ({
    route: {
        params: {
            sessionName = '',
        },
    },
}) => ({
    title: extractSessionType({ sessiontype: sessionName }),
});

export default function SelectBreakout({
    navigation,
    route: {
        params: {
            sessionName,
            id,
        },
    },
}) {
    return (
        <StorageConsumer>
            {({
                breakouts: {
                    [sessionName]: breakouts = [],
                },
                scheduleArray = [],
            }) => (
                    <ScrollView>
                        <View style={styles.view}>
                            <FlatList
                                keyExtractor={({ id }) => id}
                                data={breakouts}
                                renderItem={({ item: session }) => (
                                    <SessionTile
                                        navigation={navigation}
                                        session={session}
                                        addedToSchedule={scheduleArray.some(({ selectedSession: { title } = {} }) => title === session.title)}
                                    />
                                )}
                            />
                        </View>
                    </ScrollView>
                )}
        </StorageConsumer>
    );
}
