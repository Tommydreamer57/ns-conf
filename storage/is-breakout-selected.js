
export default ({ days = [] } = {}) => ({ title }) => (
    days.some(({ events = [] }) => (
        events.some(({ selectedSession }) => (
            (selectedSession || {}).title === title
        ))
    ))
);
