import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StorageContext } from '../storage/StorageProvider';
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
        breakoutTitle,
        day,
        time,
        location = '',
        room = '',
        demographic,
        note,
        panelists,
        isSelected
    } = {},
    doNotRenderTime = false,
    renderDayInsteadOfSpeaker = false,
    highlightLocation = false,
    doNotRenderBreakoutTitle = false,
    emphasizeTitle = false,
}) {

    const color = type.match(/keynote/i) ||
        (
            type.match(/breakout.*session/i)
            &&
            !isSelected
        ) ?
        'black'
        :
        type.match(/social/i) ?
            'green'
            :
            'blue';

    return (
        <TouchableOpacity
            style={[
                styles.eventTile,
                styles.marginBottomLarge,
            ]}
            onPress={() => navigate('SessionInfo', { title })}
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
                            emphasizeTitle ?
                                styles.h1
                                :
                                styles.h2,
                            styles.marginBottomXxSmall,
                            match(color).against({
                                black: styles.blackText,
                                green: styles.blueGreenText,
                                blue: styles.blueText,
                            }).otherwise(null),
                        ]}
                    >{(breakoutTitle && !doNotRenderBreakoutTitle) ?
                        breakoutTitle
                        :
                        `${panelists ? 'Panel: ' : ''}${title}`
                        }</Text>
                    {renderDayInsteadOfSpeaker || doNotRenderTime ? null : (
                        <Text
                            style={styles.h4}
                        >{time}</Text>
                    )}
                </View>
                {(breakoutTitle && !doNotRenderBreakoutTitle) ? (
                    <Text
                        style={[
                            styles.h3,
                            styles.marginBottomXxSmall,
                        ]}
                    >{panelists ? 'Panel: ' : ''}{title}</Text>
                ) : null}
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
                            doNotRenderPanelists={!doNotRenderBreakoutTitle}
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
                {location ? (
                    <Text
                        style={[
                            styles.h4,
                            highlightLocation ? styles.blueText : null,
                        ]}
                    >{location}</Text>
                ) : null}
                {room || demographic ? (
                    <Text
                        style={[
                            styles.h4,
                            highlightLocation ? styles.blueText : null,
                        ]}
                    >{room}{demographic ? ` - ${demographic}` : ''}</Text>
                ) : null}
            </View>
        </TouchableOpacity>
    );
}
