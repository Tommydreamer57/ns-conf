import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { Alert, Image, ImageBackground, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { sendMessage } from '../storage/service';
import { SIZES, Window, COLORS } from '../styles/styles';
import { StorageContext } from '../storage/StorageProvider';

export const iconPrefix = Platform.OS === "ios" ?
    "ios"
    :
    "md";

const links = [
    {
        name: "SCHEDULE",
        to: "Schedule",
        icon: "add-circle",
    },
    {
        name: "SPEAKERS",
        to: "Speakers",
        icon: "people",
    },
    {
        name: "MAP",
        to: "Map",
        icon: "map",
    },
    {
        name: "FEEDBACK",
        to: "Feedback",
        icon: "paper",
    },
];

Home.navigationOptions = {
    header: () => null,
};

export default function Home({
    navigation: {
        navigate,
    },
}) {
    const { homeLinks = [] } = useContext(StorageContext);
    return (
        <ImageBackground
            source={require('../assets/BKGD.png')}
            style={styles.background}
        >
            <Image
                source={require('../assets/LogoTop.png')}
                style={styles.topPadding}
            />
            <View
                style={styles.links}
            >
                {[
                    ...links,
                    ...homeLinks,
                ].map(({
                    to,
                    icon,
                    name,
                    url,
                }) => (
                        <TouchableOpacity
                            key={name}
                            style={styles.homeLink}
                            onPress={to ?

                                () => navigate(to)
                                :
                                Platform.OS === 'android' && url.match(/sms/) ?
                                    sendMessage
                                    :
                                    () =>
                                        Linking.canOpenURL(url) ?
                                            Linking.openURL(url)
                                            :
                                            Alert.alert(`Cannot open url: ${url}`)}
                        >
                            <Ionicons
                                name={`${iconPrefix}-${icon}`}
                                size={SIZES.homeIcon}
                                color='white'
                            />
                            <Text
                                style={styles.text}
                            >
                                {name}
                                {!to && url && Linking.canOpenURL(url) ? (
                                    <>
                                        &nbsp;&nbsp;
                                        <Ionicons
                                            name={`${iconPrefix}-open`}
                                            size={SIZES.xxxLarge}
                                            color="white"
                                        />
                                    </>
                                ) : null}
                            </Text>
                        </TouchableOpacity>
                    ))}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.orange,
    },
    topPadding: {
        resizeMode: 'contain',
        width: Window.width * 1.2,
        marginLeft: Window.width * -0.1,
        marginRight: Window.width * -0.1,
        marginTop: Window.height * 0.03,
        height: Window.height * 0.35,
        marginBottom: Window.height * -0.025,
    },
    bottomPadding: {
        resizeMode: 'contain',
        width: Window.width * 0.5,
        height: Window.height * 0.17,
        marginLeft: Window.width * 0.25,
        marginRight: Window.width * 0.25,
        marginTop: 0,
    },
    links: {
        height: Window.height * 0.5,
        width: Window.width * 0.85,
        marginLeft: Window.width * 0.075,
        marginRight: Window.width * 0.075,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    homeLink: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        overflow: 'visible',
        padding: SIZES.small,
        marginBottom: SIZES.medium,
        // borderColor: COLORS.white,
        // borderWidth: 1,
    },
    text: {
        color: 'white',
        fontSize: SIZES.xxxLarge,
        textAlign: 'center',
        marginLeft: SIZES.xLarge,
        textTransform: 'lowercase',
        overflow: 'visible',
    },
});
