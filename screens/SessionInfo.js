import React, { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import IconButton from '../components/IconButton';
import SessionSpeakers from '../components/SessionSpeakers';
import { StorageContext } from '../storage/StorageProvider';
import styles from '../styles/styles';

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
                type = '',
                day,
                time,
                location,
                room,
                demographic,
                description,
            } = {},
        },
        isSelected,
        getBreakout,
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
                {description ? (
                    <Text
                        style={[
                            styles.text,
                            styles.marginBottomXxLarge,
                        ]}
                    >{description}</Text>
                ) : null}
                {type.match(/breakout.*session/i) ? (
                    isSelected(session) ? (
                        <>
                            <IconButton
                                text="Remove From Schedule"
                                iconName="trash"
                                onPress={() => unselectBreakout(session)}
                            />
                            <IconButton
                                iconName="eye"
                                text="View Other Breakouts"
                                onPress={() => navigate('SelectBreakout', { title: (getBreakout(session) || {}).title })}
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
                <IconButton
                    text="Provide Feedback"
                    iconName="paper"
                    onPress={() => navigate("Feedback", { title })}
                />
                <Text>{JSON.stringify()}</Text>
            </View>
        </ScrollView>
    );
}