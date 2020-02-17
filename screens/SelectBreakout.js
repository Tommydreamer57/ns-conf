import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import EventTile from '../components/EventTile';
import { StorageContext } from '../storage/StorageProvider';
import styles from '../styles/styles';

SelectBreakout.navigationOptions = ({
    route: {
        params: {
            title,
        },
    },
}) => ({ title });

export default function SelectBreakout({
    navigation,
    route: {
        params: {
            title,
        },
    },
}) {

    const {
        hashedEvents: {
            [title]: {
                sessions = [],
                selectedSession,
            } = {},
        },
    } = useContext(StorageContext);

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
                    doNotRenderBreakoutTitle={true}
                />
            )}
        />
    );
}
