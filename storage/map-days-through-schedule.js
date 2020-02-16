
export default schedule => ({
    ...schedule,
    days: schedule.days.map(day => ({
        ...day,
        events: day.events.map(event => ({
            ...event,
            day: day.day,
            ...(event.type || '').match(/breakout/i) && {
                sessions: (event.sessions || []).map(session => ({
                    ...session,
                    time: session.time || event.time,
                    day: day.day,
                })),
            },
        })),
    })),
});
