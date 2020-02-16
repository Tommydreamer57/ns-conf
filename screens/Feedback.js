import React, { Component } from 'react';
import { Slider, Text, TextInput, TouchableOpacity, View } from 'react-native';
import KeyboardView from '../components/KeyboardView';
import { StorageConsumer } from '../storage/StorageProvider';
import styles, { COLORS } from '../styles/styles';

export default class Feedback extends Component {

    static navigationOptions = { title: "Feedback" };

    state = {
        loading: false,
        sessionId: -1,
        sessionName: "",
        likeFeedback: "",
        dislikeFeedback: "",
        rating: 10,
        generalFeedback: "",
        userEmail: "",
        userName: "",
    };

    onSubmitEditing = ref => () => {
        const nextRef = this[ref];
        nextRef.focus();
    }

    componentDidMount = () => {
        const {
            props: {
                route: {
                    params: {
                        sessionName,
                        id: sessionId,
                    },
                },
            },
        } = this;
        this.setState({
            sessionName,
            sessionId,
        });
    }

    selectSession = ({ sessionId, sessionName }) => this.setState({
        sessionId,
        sessionName,
    });

    render = () => {
        const {
            state: {
                loading,
                sessionId,
                sessionName,
                likeFeedback,
                dislikeFeedback,
                rating,
                generalFeedback,
                userEmail,
                userName,
            },
            props: {
                navigation,
                navigation: {
                    navigate,
                    goBack,
                },
            },
            selectSession,
            onSubmitEditing,
        } = this;

        if (loading) return (
            <View style={styles.view}>
                <Text>Sending Review...</Text>
            </View>
        );
        else return (
            <StorageConsumer>
                {({
                    allSessions: {
                        [sessionId]: session,
                        [sessionId]: {
                            title,
                            speakername,
                            sessiontime,
                            sessiontype = '',
                        } = {},
                    },
                    scheduleArray,
                    submitReview,
                }) => (
                        <KeyboardView>
                            {/* <FeedbackSelect
                                navigation={navigation}
                                visible={!sessionId}
                                onSelect={selectSession}
                            /> */}
                            <View style={styles.view}>
                                <TouchableOpacity
                                    onPress={() => navigate('SessionInfo', {
                                        id: sessionId,
                                        sessionName,
                                    })}
                                >
                                    <Text style={[
                                        styles.h1,
                                        styles.marginBottomXxSmall,
                                    ]} >{title}</Text>
                                    <Text style={[
                                        styles.h2,
                                        styles.marginBottomXxSmall,
                                    ]} >{speakername}</Text>
                                    {/* <Text style={[
                                        styles.h4,
                                        styles.marginBottomXxLarge,
                                    ]} >{extractSessionDay({ sessiontype })} {sessiontime}</Text> */}
                                </TouchableOpacity>

                                <Text style={[
                                    styles.feedbackLabel,
                                ]}>Overall Rating</Text>
                                <Slider
                                    minimumTrackTintColor={COLORS.blue}
                                    ref={el => this.rating = el}
                                    value={rating}
                                    minimumValue={0}
                                    step={1}
                                    maximumValue={10}
                                    onSlidingComplete={rating => this.setState({ rating })}
                                />
                                <View style={[
                                    styles.sliderLabels,
                                    styles.marginBottomXxLarge,
                                ]}>
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                        <Text
                                            key={n}
                                            style={[
                                                styles.sliderLabel, {
                                                    color: n === rating ?
                                                        COLORS.blue
                                                        :
                                                        COLORS.black,
                                                }]}
                                        >{n}</Text>
                                    ))}
                                </View>
                                <Text style={[
                                    styles.feedbackLabel,
                                ]} >Likes</Text>
                                <TextInput
                                    ref={el => this.likeFeedback = el}
                                    style={[
                                        styles.input,
                                        styles.marginBottomXxLarge,
                                    ]}
                                    scrollEnabled={false}
                                    multiline={true}
                                    placeholder="What did you like?"
                                    value={likeFeedback}
                                    onChangeText={likeFeedback => this.setState({
                                        likeFeedback: likeFeedback.replace(/\n/, ''),
                                    })}
                                    onSubmitEditing={onSubmitEditing("dislikeFeedback")}
                                />
                                <Text style={[
                                    styles.feedbackLabel,
                                ]} >Suggestions</Text>
                                <TextInput
                                    ref={el => this.dislikeFeedback = el}
                                    style={[
                                        styles.input,
                                        styles.marginBottomXxLarge,
                                    ]}
                                    scrollEnabled={false}
                                    multiline={true}
                                    placeholder="Any suggestions?"
                                    value={dislikeFeedback}
                                    onChangeText={dislikeFeedback => this.setState({
                                        dislikeFeedback: dislikeFeedback.replace(/\n/, ''),
                                    })}
                                    onSubmitEditing={onSubmitEditing("generalFeedback")}
                                />
                                <Text style={[
                                    styles.feedbackLabel,
                                ]} >General Feedback</Text>
                                <TextInput
                                    ref={el => this.generalFeedback = el}
                                    style={[
                                        styles.input,
                                        styles.marginBottomXxLarge,
                                    ]}
                                    scrollEnabled={false}
                                    multiline={true}
                                    placeholder="Any other feedback?"
                                    value={generalFeedback}
                                    onChangeText={generalFeedback => this.setState({
                                        generalFeedback: generalFeedback.replace(/\n/, ''),
                                    })}
                                    onSubmitEditing={onSubmitEditing("userName")}
                                />
                                <Text style={[
                                    styles.feedbackLabel,
                                ]} >Your Name</Text>
                                <TextInput
                                    ref={el => this.userName = el}
                                    style={[
                                        styles.input,
                                        styles.marginBottomXxLarge,
                                    ]}
                                    placeholder="Name"
                                    value={userName}
                                    onChangeText={userName => this.setState({ userName })}
                                    onSubmitEditing={onSubmitEditing("userEmail")}
                                />
                                <Text style={[
                                    styles.feedbackLabel,
                                ]} >Your Email</Text>
                                <TextInput
                                    ref={el => this.userEmail = el}
                                    style={[
                                        styles.input,
                                        styles.marginBottomXLarge,
                                    ]}
                                    placeholder="Email"
                                    value={userEmail}
                                    onChangeText={userEmail => this.setState({ userEmail })}
                                />
                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        styles.marginTopMedium,
                                    ]}
                                    onPress={async () => {
                                        // Alert.alert(JSON.stringify(this.state));
                                        this.setState({ loading: true });
                                        const success = await submitReview({
                                            ...this.state,
                                            sessionTitle: title,
                                            sessionSpeaker: speakername,
                                        });
                                        if (success) {
                                            goBack();
                                        } else {
                                            this.setState({ loading: false });
                                        }
                                    }}
                                >
                                    <Text style={styles.buttonText}>Submit Review</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardView>
                    )}
            </StorageConsumer>
        )
    }
};
