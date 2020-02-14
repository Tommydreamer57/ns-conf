
export default ({
    context: {
        scheduleArray = [],
    } = {},
    state: {
        input = '',
        filterBySchedule = false,
    } = {},
}) => ({
    id = '',
    title = '',
    speakername = '',
    sessiontype = '',
    room = '',
    demographic = '',
} = {}) => [title, speakername, sessiontype, room, demographic]
    .some(str => (str || '').toUpperCase().includes(input.toUpperCase()))
        &&
        (
            !filterBySchedule
            ||
            scheduleArray.some(({ selectedSession }) => selectedSession && selectedSession.id === id)
        );
