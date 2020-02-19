import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import IconButton from '../components/IconButton';
import SessionSpeakers from '../components/SessionSpeakers';
import { StorageContext } from '../storage/StorageProvider';
import styles, { SIZES, COLORS } from '../styles/styles';
import { iconPrefix } from './Home';

SessionInfo.navigationOptions = { title: "Session Info" };

export default function SessionInfo({
    navigation: {
        navigate,
    },
    route: {
        params: {
            title,
        },
    },
}) {

    const {
        hashedEvents: {
            [title]: session,
            [title]: {
                breakoutTitle,
                type = '',
                day,
                time,
                location,
                room,
                demographic,
                description,
                isSelected,
                speakers,
                facilitator,
                moderator,
                panelists,
                feedbackURL,
            } = {},
        } = {},
        selectBreakout,
        unselectBreakout,
    } = useContext(StorageContext);

    return (
        <ScrollView>
            <View style={styles.view}>
                <Text
                    style={[
                        styles.h1,
                        styles.marginBottomMedium,
                    ]}
                >{title}</Text>
                <SessionSpeakers
                    style={[
                        styles.h2,
                        styles.marginBottomXxSmall,
                    ]}
                    session={session}
                    doNotRenderPanelists={true}
                />
                <SessionSpeakers
                    style={[
                        styles.h3,
                        styles.marginBottomXxSmall,
                    ]}
                    session={session}
                    onlyRenderPanelists={true}
                />
                {day || time ? (
                    <Text
                        style={[
                            styles.h3,
                            styles.marginBottomXxSmall,
                        ]}
                    >{day} {time}</Text>
                ) : null}
                {location || room ? (
                    <Text
                        style={[
                            styles.h3,
                            styles.marginBottomXxSmall,
                        ]}
                    >{location ? 'Location: ' : 'Room: '} {location || room}</Text>
                ) : null}
                {demographic ? (
                    <Text
                        style={[
                            styles.h4,
                            styles.marginBottomLarge,
                        ]}
                    >Demographic: {demographic}</Text>
                ) : null}
                <Text
                    style={[
                        styles.text,
                        styles.marginBottomXxLarge,
                    ]}
                >{description}</Text>
                {type.match(/breakout.*session/i) ? (
                    isSelected ? (
                        <>
                            <IconButton
                                text="Remove From Schedule"
                                iconName="trash"
                                onPress={() => unselectBreakout(session)}
                            />
                            <IconButton
                                iconName="eye"
                                text="View Other Breakouts"
                                onPress={() => navigate('SelectBreakout', { title: breakoutTitle })}
                            />
                        </>
                    ) : (
                            <IconButton
                                iconName="add-circle-outline"
                                text="Add To Schedule"
                                onPress={() => selectBreakout(session)}
                            />
                        )
                ) : null}
                {room ? (
                    <IconButton
                        text={`View ${room} Map`}
                        iconName="map"
                        onPress={() => navigate("Map", { room })}
                    />
                ) : null}
                {speakers || facilitator || moderator || panelists ? (
                    facilitator || (speakers && speakers.length === 1) ? (
                        <IconButton
                            text="View Speaker"
                            iconName="people"
                            onPress={() => navigate("SpeakerInfo", { name: (facilitator || speakers[0]).name })}
                        />
                    ) : (
                            <IconButton
                                text="View Speakers"
                                iconName="people"
                                onPress={() => navigate("Speakers", { title })}
                            />
                        )
                ) : null}
                {feedbackURL ? (
                    <IconButton
                        text={(
                            <Text>
                                Provide Feedback
                                &nbsp;
                                <Ionicons
                                    name={`${iconPrefix}-open`}
                                    size={SIZES.medium}
                                    color={COLORS.blue + '88'}
                                />
                            </Text>
                        )}
                        iconName="paper"
                        onPress={() => Linking.canOpenURL(feedbackURL) && Linking.openURL(feedbackURL)}
                    />
                ) : null}
            </View>
        </ScrollView>
    );
}