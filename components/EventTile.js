import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/styles';
import match from '../utils/match';
import SessionSpeakers from './SessionSpeakers';

export default function EventTile({
    event,
    event: {
        type,
        title,
        time,
        location = '',
        room = '',
        demographic,
        description = '',
        moderator,
        panelists,
    } = {},
    addedToSchedule = false,
    doNotRenderTime = false,
    highlightLocation = false,
}) {

    const LOC_DEM = location || room || demographic ? (
        <Text
            style={[
                styles.h4,
                highlightLocation ? styles.blueText : null,
            ]}
        >{location || room}{demographic ? ` - ${demographic}` : ''}</Text>
    ) : null;

    const DESCRIPTION = description ? (
        <Text
            style={styles.text}
        >{description}</Text>
    ) : null;

    return (
        <View
            style={[
                styles.eventTile,
                styles.marginBottomLarge,
            ]}
        >
            <View
                style={[
                    match(type)
                        .against({
                            Social: styles.blueGreenBackground,
                            Keynote: styles.blackBackground,
                        })
                        .otherwise(addedToSchedule ?
                            styles.blueBackground
                            :
                            styles.blackBackground),
                    styles.sessionTileBar,
                ]}
            />
            <View>
                <View style={styles.sessionHeader}>
                    <Text
                        style={[
                            styles.h2,
                            styles.marginBottomXxSmall,
                            match(type)
                                .against({
                                    Social: styles.blueGreenText,
                                    Keynote: styles.blackText,
                                })
                                .otherwise(addedToSchedule ?
                                    styles.blueText
                                    :
                                    styles.blackText),
                        ]}
                    >{moderator && panelists ? 'Panel: ' : ''}{title}</Text>
                    {doNotRenderTime ? null : (
                        <Text
                            style={styles.h4}
                        >{time}</Text>
                    )}
                </View>
                <SessionSpeakers
                    session={event}
                />
                {(location || room).length > description.length ? (
                    <>
                        {DESCRIPTION}
                        {LOC_DEM}
                    </>
                ) : (
                        <>
                            {LOC_DEM}
                            {DESCRIPTION}
                        </>
                    )}
            </View>
        </View>
    );
}
