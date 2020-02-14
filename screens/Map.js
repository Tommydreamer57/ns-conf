import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import styles, { Window } from '../styles/styles';

Map.navigationOptions = ({
    route: {
        params: {
            room = '',
        } = {},
    },
}) => ({
    title: `Map - ${(MAPS.find(({ match }) => room.match(match)) || {}).name || 'General'}`,
});

const MAPS = [{
    match: /alta/i,
    name: "Alta",
    source: require('../assets/maps/Alta.png'),
}, {
    match: /cottonwood/i,
    name: "Big Cottonwood",
    source: require('../assets/maps/BigCottonwood.png'),
}, {
    match: /brighton/i,
    name: "Brighton",
    source: require('../assets/maps/Brighton.png'),
}, {
    match: /deer\s*valley/i,
    name: "Deer Valley",
    source: require('../assets/maps/DeerValley.png'),
}, {
    match: /executive\s*board/i,
    name: "Executive Board",
    source: require('../assets/maps/ExecutiveBoard.png'),
}, {
    match: /ballroom/i,
    name: "Grand Ballroom",
    source: require('../assets/maps/GrandBallroom.png'),
}, {
    match: /powder/i,
    name: "Powder Mountain",
    source: require('../assets/maps/PowderMountain.png'),
}, {
    match: /sidewinder/i,
    name: "Sidewinder",
    source: require('../assets/maps/Sidewinder.png'),
}, {
    match: /snowbird/i,
    name: "Snowbird",
    source: require('../assets/maps/Snowbird.png'),
}, {
    match: /sundance/i,
    name: "Sundance",
    source: require('../assets/maps/Sundance.png'),
}, {
    match: /wasatch/i,
    name: "Wasatch",
    source: require('../assets/maps/Wasatch.png'),
}, {
    match: /wildcat/i,
    name: "Wildcat",
    source: require('../assets/maps/Wildcat.png'),
}, {
    match: /^/,
    name: "General",
    source: require('../assets/maps/Map.png'),
}];

export default function Map({
    route: {
        params: {
            room = '',
        } = {},
    },
}) {
    const { source } = MAPS.find(({ match }) => room.match(match)) || {};
    return (
        <ScrollView
            maximumZoomScale={4}
            minimumZoomScale={1}
        >
            <View style={styles.view}>
                <Image
                    source={source}
                    style={{
                        width: Window.width * .9,
                        height: Window.height * .9,
                    }}
                    resizeMode="contain"
                />
            </View>
        </ScrollView>
    );
}
