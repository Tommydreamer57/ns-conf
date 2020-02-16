import React from 'react';
import { FlatList } from 'react-native';
import EventTile from '../components/EventTile';
import styles from '../styles/styles';

SelectBreakout.navigationOptions = ({
    route: {
        params: {
            breakout: {
                title,
            },
        },
    },
}) => ({ title });

export default function SelectBreakout({
    navigation,
    route: {
        params: {
            breakout: {
                title,
                sessions,
                selectedSession,
            },
        },
    },
}) {

    const {
        title: selectedTitle,
    } = selectedSession || {};

    return (
        <FlatList
            contentContainerStyle={styles.view}
            keyExtractor={({ title }) => title}
            data={sessions}
            renderItem={({ item: session }) => (
                <EventTile
                    event={session}
                    navigation={navigation}
                    addedToSchedule={title === selectedTitle}
                    doNotRenderTime={true}
                    highlightLocation={true}
                />
            )}
        />
    );
}
