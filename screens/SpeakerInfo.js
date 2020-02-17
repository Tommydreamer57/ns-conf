import React, { useContext } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import EventTile from '../components/EventTile';
import { StorageContext } from '../storage/StorageProvider';
import styles from '../styles/styles';

SpeakerInfo.navigationOptions = { title: "Speaker Info" };

export default function SpeakerInfo({
    navigation,
    route: {
        params: {
            name,
        },
    },
}) {
    const {
        speakers: {
            [name]: {
                bio,
                photo,
                events,
            },
        } = {},
    } = useContext(StorageContext);
    
    return (
        <ScrollView>
            <View style={styles.view}>
                <Image
                    style={styles.speakerphoto}
                    source={{
                        uri: photo || 'https://www.nycc.edu/themes/nycc/images/default_profile.jpg'
                    }}
                />
                <Text
                    style={[
                        styles.h1,
                        styles.marginBottomLarge,
                    ]}
                >{name}</Text>
                {bio ? (
                    <Text
                        style={[
                            styles.text,
                            styles.marginBottomXLarge,
                        ]}
                    >{bio}</Text>
                ) : null}
                <View>
                    <Text
                        style={[
                            styles.h2,
                            styles.marginTopMedium,
                            styles.marginBottomMedium,
                        ]}
                    >Sessions</Text>
                    {events.map(session => (
                        <EventTile
                            key={session.title}
                            navigation={navigation}
                            event={session}
                            renderDayInsteadOfSpeaker={true}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}
