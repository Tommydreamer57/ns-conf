import React from 'react';
import EmptyBreakout from '../components/EmptyBreakout';
import EventTile from '../components/EventTile';

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
            doNotRenderDescription={true}
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
                        doNotRenderDescription={true}
                    />
                )
        );
}
