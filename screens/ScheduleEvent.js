import React from 'react';
import EmptyBreakout from '../components/EmptyBreakout';
import EventTile from '../components/EventTile';
import { Text } from 'react-native';

export default function ScheduleEvent({
    event,
    event: {
        type,
        selectedSession,
    },
    navigation,
}) {
    return selectedSession ? (
        <EventTile
            event={selectedSession}
            navigation={navigation}
        />
    ) : (
            type === 'Breakout' ? (
                <EmptyBreakout
                    breakout={event}
                    navigation={navigation}
                />
            ) : (
                    <EventTile
                        event={event}
                        navigation={navigation}
                    />
                )
        );
}
