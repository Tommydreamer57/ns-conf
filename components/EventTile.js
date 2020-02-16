import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../styles/styles';
import match from '../utils/match';
import SessionSpeakers from './SessionSpeakers';

export default function EventTile({
    navigation: {
        navigate,
    },
    event,
    event: {
        type = '',
        title,
        day,
        time,
        location = '',
        room = '',
        demographic,
        note,
        description,
        speakers,
        moderator,
        panelists,
    } = {},
    addedToSchedule = false,
    doNotRenderDescription = false,
    doNotRenderTime = false,
    renderDayInsteadOfSpeaker = false,
    highlightLocation = false,
}) {

    const Wrapper = (
        type.match(/breakout.*session/i)
        ||
        speakers
        ||
        moderator
        ||
        panelists
        ||
        description
    ) ?
        TouchableOpacity
        :
        View;

    return (
        <Wrapper
            style={[
                styles.eventTile,
                styles.marginBottomLarge,
            ]}
            {...Wrapper === TouchableOpacity && {
                onPress: () => navigate('SessionInfo', { session: event }),
            }}
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
                    {renderDayInsteadOfSpeaker || doNotRenderTime ? null : (
                        <Text
                            style={styles.h4}
                        >{time}</Text>
                    )}
                </View>
                {renderDayInsteadOfSpeaker ? (
                    <Text
                        style={[
                            styles.h3,
                            styles.marginBottomXxSmall,
                        ]}
                    >{day} {time}</Text>
                ) : (
                        <SessionSpeakers
                            session={event}
                        />
                    )}
                {note ? (
                    <Text
                        style={[
                            styles.text,
                            styles.bold,
                        ]}
                    >{note}</Text>
                ) : null}
                {location || room || demographic ? (
                    <Text
                        style={[
                            styles.h4,
                            highlightLocation ? styles.blueText : null,
                        ]}
                    >{location || room}{demographic ? ` - ${demographic}` : ''}</Text>
                ) : null}
                {description && !doNotRenderDescription ? (
                    <Text
                        style={styles.text}
                    >{description}</Text>
                ) : null}
            </View>
        </Wrapper>
    );
}
