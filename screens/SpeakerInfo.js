import React, { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
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
            [name]: speaker,
            [name]: {
                bio,
                events,
            },
        } = {},
    } = useContext(StorageContext);
    return (
        <ScrollView>
            <View style={styles.view}>
                {/* <Image
                    style={styles.speakerphoto}
                    source={{
                        uri: speakerphoto
                            ||
                            photo
                            ||
                            'https://www.nycc.edu/themes/nycc/images/default_profile.jpg'
                    }}
                /> */}
                <Text style={[
                    styles.h1,
                    styles.marginBottomLarge,
                ]} >{name}</Text>
                <Text style={[
                    styles.text,
                    styles.marginBottomXLarge,
                ]} >{bio}</Text>
                <View>
                    <Text style={[
                        styles.h2,
                        styles.marginTopMedium,
                        styles.marginBottomMedium,
                    ]} >Sessions</Text>
                    {events.map(session => (
                        <EventTile
                            key={session.title}
                            navigation={navigation}
                            events={session}
                            renderTimeInsteadOfSpeaker={true}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}
