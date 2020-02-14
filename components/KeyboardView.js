import React, { Component } from 'react';
import { Animated, Keyboard } from 'react-native';

export default class KeyboardView extends Component {

    state = {
        keyboardHeight: new Animated.Value(0),
        didShow: false,
    };

    componentWillMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardWillShow = (event) => {
        Animated.spring(this.state.keyboardHeight, {
            duration: event.duration,
            toValue: -event.endCoordinates.height,
        }, {
            friction: 1, // not sure this does anything...
            bounciness: 1, // not sure this does anything...
        }).start(() => this.setState({ didShow: true }));
    };

    keyboardWillHide = (event) => {
        Animated.spring(this.state.keyboardHeight, {
            duration: event.duration,
            toValue: 0,
        }, {
            friction: 1, // not sure this does anything...
            bounciness: 1, // not sure this does anything...
        }).start();
    };

    render() {
        return (
            <Animated.ScrollView
                style={{
                    transform: [{
                        translateY: this.state.keyboardHeight
                    }]
                }}
            >
                {this.props.children}
            </Animated.ScrollView>
        );
    }
};
