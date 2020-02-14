import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';

export default function SocialTile({
    navigation: {
        navigate,
    },
    onPress,
    event: {
        name = "",
        type = "",
        day = "",
        time = "",
        location = "",
        description = "",
    } = {},
}) {

    return (
        <TouchableOpacity
            style={[
                // styles.sessionTile,
                styles.socialTile,
                styles.selectedSession,
                styles.marginBottomLarge,
            ]}
        // onPress={onPress || (() => navigate("SessionInfo", {
        //     sessionName: sessiontype.toUpperCase(),
        //     id,
        // }))}
        >
            <View style={[
                styles.sessionTileBar,
                styles.blueGreenBackground,
            ]} />
            <View>
                <Text style={[
                    styles.h2,
                    styles.blueGreenText,
                    styles.marginBottomXxSmall,
                ]} >{name}</Text>
                <Text style={[
                    styles.h3,
                ]} >{day} {time}</Text>
                <Text style={[
                    styles.h4,
                ]} >{location}</Text>
                {description ? (
                    <Text style={[
                        styles.text,
                    ]} >{description}</Text>
                ) : null}
            </View>
        </TouchableOpacity>
    );
}
