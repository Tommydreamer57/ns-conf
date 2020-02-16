import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StorageContext } from '../storage/StorageProvider';
import styles, { COLORS, SIZES } from '../styles/styles';
import { iconPrefix } from './Home';

AllSpeakers.navigationOptions = { title: "All Speakers" };

export default function AllSpeakers({
    navigation: {
        navigate,
    },
}) {

    const [input, setInput] = useState("");

    const filter = ({ name }) => name.toLowerCase().includes(input.toLowerCase());

    const { speakers } = useContext(StorageContext);

    return (
        <FlatList
            style={styles.view}
            keyExtractor={({ name }) => name}
            data={Object.values(speakers).sort(({ name: a }, { name: b }) => a > b)}
            extraData={{ input }}
            ListHeaderComponent={() => (
                <>
                    <Text>Search</Text>
                    <TextInput
                        clearButtonMode="always"
                        style={[
                            styles.searchInput,
                            styles.marginBottomXxLarge,
                        ]}
                        placeholder="Search"
                        value={input}
                        onChangeText={setInput}
                    />
                </>
            )}
            renderItem={({ item: { name } }) => filter({ name }) ? (
                <TouchableOpacity
                    style={[
                        styles.speakerButton,
                        styles.marginBottomMedium,
                    ]}
                    onPress={() => navigate("SpeakerInfo", { name })}
                >
                    <Text style={[
                        styles.speakerButtonText,
                    ]} >{name}</Text>
                    <Ionicons
                        name={iconPrefix + "arrow-forward"}
                        size={SIZES.large}
                        color={COLORS.darkGray}
                    />
                </TouchableOpacity>
            ) : null}
        />
    );
}
