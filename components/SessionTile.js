import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';
import { extractSessionDay } from '../utils/sessions';

export default function SessionTile({
    navigation: {
        navigate,
    },
    onPress,
    session: {
        id,
        title = "",
        speakername = "",
        sessiontype = "",
        sessiontime = "",
        room = "",
        demographic = "",
    } = {},
    display = true,
    renderTimeInsteadOfSpeaker,
    addedToSchedule,
}) {

    const isKeynote = sessiontype.match(/keynote/i);

    if (!display) return null;

    else return (
        <TouchableOpacity
            style={[
                styles.sessionTile,
                isKeynote && styles.keynoteSession,
                addedToSchedule && styles.selectedSession,
                styles.marginBottomLarge,
            ]}
            onPress={onPress || (() => navigate("SessionInfo", {
                sessionName: sessiontype.toUpperCase(),
                id,
            }))}
        >
            <View style={[
                styles.sessionTileBar,
                isKeynote || !addedToSchedule ?
                    styles.blackBackground
                    :
                    styles.blueBackground,
            ]} />
            <View>
                {isKeynote ? (
                    renderTimeInsteadOfSpeaker ? (
                        <>
                            <Text style={[
                                styles.h3,
                                styles.marginBottomXxSmall,
                            ]} >{title}</Text>
                            <Text style={[
                                styles.h4,
                                styles.marginBottomXxSmall,
                            ]} >{extractSessionDay({ sessiontype })} {sessiontime}</Text>
                        </>
                    ) : (
                            <>
                                <Text style={[
                                    styles.h3,
                                    styles.marginBottomXxSmall,
                                ]} >{speakername}</Text>
                                <Text style={[
                                    styles.h4,
                                    styles.marginBottomXxSmall,
                                ]} >{title}</Text>
                            </>
                        )
                ) : (
                        <>
                            <Text style={[
                                styles.h3,
                                styles.marginBottomXxSmall,
                            ]} >{title}</Text>
                            {renderTimeInsteadOfSpeaker ? (
                                <Text style={[
                                    styles.h4,
                                    styles.marginBottomXxSmall,
                                ]} >{extractSessionDay({ sessiontype })} {sessiontime}</Text>
                            ) : (
                                    <Text style={[
                                        styles.h4,
                                        styles.marginBottomXxSmall,
                                    ]} >{speakername}</Text>
                                )}
                            <Text style={[
                                styles.text,
                            ]} >Room: {room}</Text>
                        </>
                    )}
                <Text style={[
                    styles.text,
                ]} >Demographic{demographic.trim().match(/ .* /) ? 's' : ''}: {demographic}</Text>
            </View>
        </TouchableOpacity>
    );
}
