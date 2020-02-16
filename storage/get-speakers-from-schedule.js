import { Alert } from "react-native";
import { pipe, tap } from "../utils/pipe";

const getSpeakersFromEvent = ({ speakers = [], moderator, panelists = [] } = {}) => [
    ...speakers,
    ...moderator ? [moderator] : [],
    ...panelists,
];

const mapEventOntoSpeakers = event => speaker => ({
    ...speaker,
    events: [event],
});

const getSpeakerList = ({ days = [] } = {}) => days.reduce((allSpeakers, { events = [] }) => [
    ...allSpeakers,
    ...events.reduce((allSpeakers, event) => [
        ...allSpeakers,
        ...(event.type || '').match(/breakout/i) ?
            (event.sessions || []).reduce((allSpeakers, session) => [
                ...allSpeakers,
                ...getSpeakersFromEvent(session).map(mapEventOntoSpeakers(session)),
            ], [])
            :
            getSpeakersFromEvent(event).map(mapEventOntoSpeakers(event)),
    ], []),
], []);

const reduceSpeakers = speakers => speakers.reduce((speakers, { name, bio, events = [] }) => ({
    ...speakers,
    [name]: {
        name,
        bio,
        events: [
            ...(speakers[name] || {}).events || [],
            ...events,
        ],
    },
}), {});

export default schedule => pipe(
    schedule,
    getSpeakerList,
    tap(list => Alert.alert(list.map(({ name }) => name).join())),
    reduceSpeakers,
);
