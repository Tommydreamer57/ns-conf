
export default schedule => ({
    ...schedule,
    days: schedule.days.map(day => ({
        ...day,
        events: day.events.map(event => ({
            ...event,
            day: day.day,
            ...(event.type || '').match(/breakout/i) && {
                sessions: (event.sessions || []).map(session => ({
                    time: event.time,
                    type: 'Breakout Session',
                    day: day.day,
                    ...session,
                })),
            },
        })),
    })),
});
