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
        type.match(/session/i)
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

    const color = (
        Wrapper === View
        ||
        (
            !addedToSchedule
            &&
            type.match(/session/)
        )
    ) ?
        'black'
        :
        type.match(/keynote/i) ?
            'green'
            :
            'blue';

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
                    match(color).against({
                        black: styles.blackBackground,
                        green: styles.blueGreenBackground,
                        blue: styles.blueBackground,
                    }).otherwise(null),
                    styles.sessionTileBar,
                ]}
            />
            <View>
                <View style={styles.sessionHeader}>
                    <Text
                        style={[
                            styles.h2,
                            styles.marginBottomXxSmall,
                            match(color).against({
                                black: styles.blackText,
                                green: styles.blueGreenText,
                                blue: styles.blueText,
                            }).otherwise(null),
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
