import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { Text, View, Linking } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { StorageContext } from '../storage/StorageProvider';
import styles, { SIZES, COLORS } from '../styles/styles';
import { iconPrefix } from './Home';

FeedBack.navigationOptions = { title: "Feedback" };

export default function FeedBack() {
    
    const {
        feedback: {
            links = [],
        } = {},
    } = useContext(StorageContext);

    return (
        <FlatList
            contentContainerStyle={styles.view}
            data={links}
            keyExtractor={({ title }) => title}
            renderItem={({
                item: {
                    title,
                    description,
                    url,
                },
            }) => (
                    <TouchableOpacity
                        style={[
                            styles.feedbackButton,
                            styles.marginBottomMedium,
                        ]}
                        onPress={() => Linking.canOpenURL(url) && Linking.openURL(url)}
                    >
                        <View
                            style={styles.sessionHeader}
                        >
                            <Text
                                style={[
                                    styles.h1,
                                    styles.marginBottomXxSmall,
                                ]}
                            >{title}</Text>
                            <Ionicons
                                name={`${iconPrefix}-open`}
                                size={SIZES.xLarge}
                                color={COLORS.blue + '88'}
                            />
                        </View>
                        <Text
                            style={styles.h4}
                        >{description}</Text>
                    </TouchableOpacity>
                )}
        />
    );
}
