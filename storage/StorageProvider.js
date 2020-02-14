import React, { Component, createContext } from 'react';
import { AsyncStorage } from 'react-native';
import { getItems, refetchSessionsEachDay, submitReview, validKeys } from './service';

export const StorageContext = createContext();

const { Provider, Consumer } = StorageContext;

export const StorageConsumer = Consumer;

const scheduleKeys = [
    "KEYNOTE 1",
    "BREAKOUT 1",
    "BREAKOUT 2",
    "BREAKOUT 3",
    "KEYNOTE 2",
    "KEYNOTE 3",
    "BREAKOUT 4",
    "BREAKOUT 5",
    "BREAKOUT 6",
    "KEYNOTE 4",
];

const transformSchedule = (schedule = {}) => scheduleKeys.map(key => ({
    sessionName: key,
    selectedSession: schedule[key],
}));

export default class StorageProvider extends Component {

    state = {
        allSessions: {},
        scheduleArray: [],
        schedule: {},
        breakouts: {},
        keynotes: [],
        speakers: {},
        socials: [],
        // notifications: [],
        addToSchedule() { },
        removeFromSchedule() { },
        submitReview() { },
        // deleteNotification() { },
    };

    // componentWillUnmount() {
    //     OneSignal.removeEventListener('received', this.receiveNotification);
    //     OneSignal.removeEventListener('opened', this.onOpened);
    //     OneSignal.removeEventListener('ids', this.onIds);
    // }

    componentDidMount = async () => {
        // OneSignal.init("d8ca736c-86df-4151-9df8-2fbfecf81436");

        // OneSignal.addEventListener('received', this.receiveNotification);
        // OneSignal.addEventListener('opened', this.onOpened);
        // OneSignal.addEventListener('ids', this.onIds);

        this._fetchData();
    }

    async _fetchData() {
        await refetchSessionsEachDay();

        let [
            schedule,
            breakouts,
            keynotes,
            speakers,
            socials,
            // notifications,
        ] = await getItems(
            validKeys.schedule,
            validKeys.breakouts,
            validKeys.keynotes,
            validKeys.speakers,
            validKeys.socials,
            // "notifications",
        );

        // if (!notifications) notifications = [];

        const scheduleArray = transformSchedule(schedule);

        const allSessions = {
            ...Object.values(breakouts)
                .reduce((all, breakout) => [...all, ...breakout], [])
                .concat(keynotes)
                .reduce((all, session) => ({
                    ...all,
                    [session.id]: session
                }), {}),
        };

        this.setState({
            allSessions,
            scheduleArray,
            schedule,
            breakouts,
            keynotes,
            speakers,
            socials,
            // notifications,
            addToSchedule: this.addToSchedule,
            removeFromSchedule: this.removeFromSchedule,
            // deleteNotification: this.deleteNotification,
            submitReview,
        });
    }

    addToSchedule = async id => {
        const session = this.state.allSessions[id];
        const sessionName = session.sessiontype.toUpperCase();
        const schedule = {
            ...this.state.schedule,
            [sessionName]: session,
        };
        try {
            await AsyncStorage.setItem(validKeys.schedule, JSON.stringify(schedule));
            const scheduleArray = transformSchedule(schedule);
            this.setState({
                schedule,
                scheduleArray,
            });
        } catch (err) {
            console.error(err);
        }
    }

    removeFromSchedule = async id => {
        const session = this.state.allSessions[id];
        const sessionName = session.sessiontype.toUpperCase();
        const schedule = {
            ...this.state.schedule,
            [sessionName]: {},
        };
        try {
            await AsyncStorage.setItem(validKeys.schedule, JSON.stringify(schedule));
            const scheduleArray = transformSchedule(schedule);
            this.setState({
                schedule,
                scheduleArray,
            });
        } catch (err) {
            console.error(err);
        }
    }

    render = () => (
        <Provider
            value={this.state}
        >
            {this.props.children}
        </Provider>
    );
}
