import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/styles';

export default function SessionSpeakers({
    session: {
        speakers = [],
        panelists = [],
        moderator,
    },
}) {
    return (
        speakers.length
        ||
        panelists.length
        ||
        moderator
    ) ? (
            <View style={styles.marginBottomXxSmall} >
                {speakers.length ? (
                    <Text
                        style={styles.h3}
                    >{speakers.map(({ name }) => name).join(', ')}</Text>
                ) : null}
                {moderator ? (
                    <Text
                        style={styles.h3}
                    >Moderator: {moderator.name}</Text>
                ) : null}
                {panelists.length ? (
                    <>
                        <Text
                            style={styles.h3}
                        >Panelists: {panelists.map(({ name }) => name).join(', ')}</Text>
                    </>
                ) : null}
            </View>
        ) : null;
}
