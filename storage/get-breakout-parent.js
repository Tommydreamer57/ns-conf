
export default ({ days = [] }) => session => (
    days.reduce((breakout, { events = [] }) => (
        breakout || events.find(({ time, type = '', sessions = [] } = {}) => (
            breakout || (
                time === session.time
                &&
                type.match(/breakout.*group/i)
                &&
                sessions.some(({ title }) => (
                    title === session.title
                ))
            )
        ), null)
    ), null)
);
