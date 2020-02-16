import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../styles/styles';
import { Text } from 'react-native';

export default function EmptyBreakout({
    navigation: {
        navigate,
    },
    breakout,
    breakout: {
        title,
        time,
    },
}) {
    return (
        <TouchableOpacity
            style={[
                styles.emptyBreakout,
                styles.marginBottomMedium,
            ]}
            onPress={() => navigate('SelectBreakout', { breakout })}
        >
            <Text style={[
                styles.buttonText,
            ]}>+ {title}</Text>
            <Text style={[
                styles.h4,
            ]}>{time}</Text>
        </TouchableOpacity>
    )
}
