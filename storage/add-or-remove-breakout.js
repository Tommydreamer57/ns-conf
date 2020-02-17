
export default (select, breakout) => schedule => ({
    ...schedule,
    days: schedule.days.map(day => ({
        ...day,
        events: day.events.map(event => (
            (
                (event.type || '').match(/breakout.*group/i)
                &&
                event.time === breakout.time
                &&
                event.sessions.some(({ title }) => title === breakout.title)
            ) ?
                {
                    ...event,
                    selectedSession: select ?
                        breakout
                        :
                        null,
                }
                :
                event
        )),
    })),
});
