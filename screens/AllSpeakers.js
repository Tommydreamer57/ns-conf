import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StorageConsumer } from '../storage/StorageProvider';
import styles, { COLORS, SIZES } from '../styles/styles';
import { iconPrefix } from './Home';

export default class AllSpeakers extends Component {

    static navigationOptions = { title: "All Speakers" };

    state = {
        input: "",
    };

    render = () => {
        const {
            state: {
                input,
            },
            props: {
                navigation: {
                    navigate,
                },
            },
        } = this;

        const currentFilter = ({ name }) => name.toLowerCase().includes(input.toLowerCase());

        return (
            <StorageConsumer>
                {({ speakers }) => (
                    <ScrollView>
                        <View style={styles.view} >
                            <Text>Search</Text>
                            <TextInput
                                clearButtonMode="always"
                                style={[
                                    styles.searchInput,
                                    styles.marginBottomXxLarge,
                                ]}
                                placeholder="Search"
                                value={input}
                                onChangeText={input => this.setState({ input })}
                            />
                            <FlatList
                                keyExtractor={({ name }) => name}
                                data={Object.values(speakers).sort(({ name: a }, { name: b }) => a > b)}
                                extraData={{ input }}
                                renderItem={({ item: { name, bio, photo } }) => currentFilter({ name }) ? (
                                    <TouchableOpacity
                                        style={[
                                            styles.speakerButton,
                                            styles.marginBottomMedium,
                                        ]}
                                        onPress={() => navigate("SpeakerInfo", { name, bio, photo })}
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
                        </View>
                    </ScrollView>
                )}
            </StorageConsumer>
        );
    }
}
