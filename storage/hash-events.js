
export default ({ days = [] }) => days.reduce((hashed, { events }) => ({
    ...hashed,
    ...events.reduce((hashed, event = {}) => ({
        ...hashed,
        [event.title]: event,
        ...Array.isArray(event.sessions) && event.sessions.reduce((hashed, session = {}) => ({
            ...hashed,
            [session.title]: session,
        }), {}),
    }), {}),
}), {});
