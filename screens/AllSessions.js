import React, { Component } from 'react';
import { FlatList, ScrollView, SectionList, Text, TextInput, View } from 'react-native';
import SessionTile from '../components/SessionTile';
import { StorageConsumer } from '../storage/StorageProvider';
import styles from '../styles/styles';
import filterSessions from '../utils/filters';
import { extractSessionType } from '../utils/sessions';

const sessionsByDay = [
    {
        day: "Friday",
        keynoteNumbers: [1, 2],
        breakoutNames: [
            'BREAKOUT 1',
            'BREAKOUT 2',
            'BREAKOUT 3',
        ],
    },
    {
        day: "Saturday",
        keynoteNumbers: [3, 4],
        breakoutNames: [
            'BREAKOUT 4',
            'BREAKOUT 5',
            'BREAKOUT 6',
        ],
    },
];


export default class AllSessions extends Component {

    static navigationOptions = { title: "All Sessions" };

    state = {
        input: "",
    };

    toggleDay = day => this.setState({ [day]: !this.state[day] });

    render = () => {
        const {
            state,
            state: {
                input,
            },
            props: {
                navigation,
            },
        } = this;
        return (
            <ScrollView>
                <View
                    style={styles.view}
                >
                    <Text>Search</Text>
                    <TextInput
                        clearButtonMode="always"
                        style={styles.searchInput}
                        placeholder="Search"
                        value={input}
                        onChangeText={input => this.setState({ input })}
                    />
                    <FlatList
                        keyExtractor={(_, i) => `${i}`}
                        data={sessionsByDay}
                        extraData={state}
                        renderItem={({ item }) => (
                            <Day
                                {...item}
                                input={input}
                                navigation={navigation}
                            />
                        )}
                    />
                </View>
            </ScrollView>
        );
    }
}

function Day({
    input,
    day,
    keynoteNumbers: [k1, k2],
    breakoutNames,
    navigation,
}) {
    const currentFilter = filterSessions({ state: { input } });
    return (
        <StorageConsumer>
            {({ keynotes, breakouts, schedule }) => {
                const [keynoteOne, keynoteTwo] = [k1, k2]
                    .map(n => keynotes
                        .find(({ sessiontype = '' }) => sessiontype
                            .includes(n)) || {})
                return (
                    <>
                        <Text style={[
                            styles.title,
                            styles.marginTopXxLarge,
                            styles.marginBottomXLarge,
                        ]} >{day}</Text>
                        <View
                            style={[
                                styles.breakoutHeader,
                                styles.marginBottomMedium,
                            ]}
                        >
                            <Text style={[
                                styles.h2,
                            ]} >Keynote {k1}</Text>
                            <Text style={[
                                styles.h4,
                            ]} >{keynoteOne.sessiontime || ''}</Text>
                        </View>
                        <SessionTile
                            display={currentFilter(keynoteOne)}
                            navigation={navigation}
                            session={keynoteOne}
                        />
                        <SectionList
                            keyExtractor={({ title, id }) => `${id} ${title}`}
                            sections={breakoutNames.map(name => ({
                                title: name,
                                data: breakouts[name] || [],
                            }))}
                            renderSectionHeader={({
                                section: {
                                    title,
                                    data: [
                                        {
                                            sessiontime = '',
                                        } = {},
                                    ],
                                },
                            }) => (
                                    <View
                                        style={[
                                            styles.breakoutHeader,
                                            styles.marginTopXxLarge,
                                            styles.marginBottomMedium,
                                        ]}
                                    >
                                        <Text style={[
                                            styles.h2,
                                        ]} >{extractSessionType({ sessiontype: title })}</Text>
                                        <Text style={[
                                            styles.h4,
                                        ]} >{sessiontime}</Text>
                                    </View>
                                )}
                            renderItem={({ item: session, section: { title } }) => (
                                <SessionTile
                                    display={currentFilter(session)}
                                    input={input}
                                    session={session}
                                    navigation={navigation}
                                    addedToSchedule={schedule[title]
                                        &&
                                        schedule[title].id === session.id}
                                />
                            )}
                        />
                        <View
                            style={[
                                styles.breakoutHeader,
                                styles.marginTopXxLarge,
                                styles.marginBottomMedium,
                            ]}
                        >
                            <Text style={[
                                styles.h2,
                            ]} >Keynote {k2}</Text>
                            <Text style={[
                                styles.h4,
                            ]} >{keynoteTwo.sessiontime || ''}</Text>
                        </View>
                        <SessionTile
                            display={currentFilter(keynoteTwo)}
                            navigation={navigation}
                            session={keynoteTwo}
                        />
                    </>
                );
            }}
        </StorageConsumer>
    );
}
