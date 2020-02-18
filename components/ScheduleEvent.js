import React from 'react';
import EmptyBreakout from './EmptyBreakout';
import EventTile from './EventTile';

export default function ScheduleEvent({
    event,
    event: {
        type = '',
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
            type.match(/breakout.*group/i) ? (
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
