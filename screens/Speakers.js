import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { StorageContext } from '../storage/StorageProvider';
import styles, { COLORS, SIZES } from '../styles/styles';
import { iconPrefix } from './Home';

Speakers.navigationOptions = ({
    route: {
        params: {
            title = '',
        } = {},
    },
}) => ({
    title: `Speakers${title ? ` - ${title}` : ''}`.slice(0, 25) + (title.length > 14 ? '...' : ''),
    title: "Speakers",
});

export default function Speakers({
    navigation: {
        navigate,
    },
    route: {
        params: {
            title,
        } = {},
    },
}) {

    const {
        speakers,
        hashedEvents: {
            [title]: {
                speakers: sessionSpeakers,
                facilitator,
                moderator,
                panelists,
            } = {},
        },
    } = useContext(StorageContext);

    const speakerList = title ?
        [
            ...sessionSpeakers || [],
            ...facilitator ? [facilitator] : [],
            ...moderator ? [moderator] : [],
            ...panelists || [],
        ]
        :
        Object.values(speakers).sort(({ name: a }, { name: b }) => a > b);

    return (
        <FlatList
            contentContainerStyle={styles.view}
            keyExtractor={({ name }) => name}
            data={speakerList}
            ListHeaderComponent={() => title ? (
                <Text
                    style={[
                        styles.h1,
                        styles.marginBottomMedium,
                    ]}
                >{title}</Text>
            ) : null}
            renderItem={({ item: { name, photo } }) => (
                <>
                    {name === (moderator || {}).name ? (
                        <Text
                            style={[
                                styles.h2,
                                styles.marginBottomMedium,
                            ]}
                        >Moderator</Text>
                    ) : (
                            name === ((panelists || [])[0] || {}).name ? (
                                <Text
                                    style={[
                                        styles.h2,
                                        styles.marginTopSmall,
                                        styles.marginBottomMedium,
                                    ]}
                                >Panelists</Text>
                            ) : null
                        )}
                    <TouchableOpacity
                        style={[
                            styles.speakerButton,
                            styles.marginBottomMedium,
                        ]}
                        onPress={() => navigate("SpeakerInfo", { name })}
                    >
                        <View
                            style={styles.speakerButtonTitle}
                        >
                            <Image
                                style={styles.miniSpeakerPhoto}
                                source={{
                                    uri: photo || 'https://www.nycc.edu/themes/nycc/images/default_profile.jpg'
                                }}
                            />
                            <Text
                                style={styles.speakerButtonText}
                            >{name}</Text>
                        </View>
                        <Ionicons
                            name={`${iconPrefix}-arrow-forward`}
                            size={SIZES.large}
                            color={COLORS.darkGray}
                        />
                    </TouchableOpacity>
                </>
            )}
        />
    );
}
