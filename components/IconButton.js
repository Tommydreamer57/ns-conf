import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { iconPrefix } from '../screens/Home';
import styles, { COLORS, SIZES } from '../styles/styles';

export default function IconButton({
    iconName = '',
    text,
    onPress,
}) {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                styles.iconButton,
                styles.marginBottomMedium,
            ]}
            onPress={onPress}
        >
            <View style={styles.buttonIcon}>
                <Ionicons
                    name={`${iconPrefix}-${iconName}`}
                    size={SIZES.xxLarge}
                    color={COLORS.blue + '88'}
                />
            </View>
            <Text
                style={[
                    styles.buttonText,
                    styles.iconButtonText,
                ]}
            >{text}</Text>
        </TouchableOpacity>
    )
}
