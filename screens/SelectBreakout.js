import React, { useContext } from 'react';
import { FlatList, Text } from 'react-native';
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
                day,
                time,
                sessions = [],
            } = {},
        },
    } = useContext(StorageContext);

    return (
        <FlatList
            contentContainerStyle={styles.view}
            keyExtractor={({ title }) => title}
            data={sessions}
            ListHeaderComponent={() => (
                <Text
                    style={[
                        styles.h1,
                        styles.marginBottomXxLarge,
                    ]}
                >{day} {time}</Text>
            )}
            renderItem={({ item: session }) => (
                <EventTile
                    event={session}
                    navigation={navigation}
                    doNotRenderTime={true}
                    highlightLocation={true}
                    doNotRenderBreakoutTitle={true}
                />
            )}
        />
    );
}
