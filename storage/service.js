import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { asyncPipe } from '../utils/pipe';

// CONSTANTS

const baseURL = 'http://ns-conf.lowrysoftware.com/api';
const storage_key = 'SCHEDULE';

// UTILS

const fetchPath = path => asyncPipe(
    axios.get(`${baseURL}/${path}`),
    ({ data }) => data,
);

const getScheduleStorage = () => asyncPipe(
    AsyncStorage.getItem(storage_key),
    JSON.parse,
);

const setScheduleStorage = value => asyncPipe(
    AsyncStorage.setItem(storage_key, JSON.stringify(value)),
    () => value,
);

// ACTIONS

export const fetchSchedule = () => asyncPipe(
    Promise.all([
        // get stored schedule    
        getScheduleStorage(),
        // get the date of the latest schedule update
        fetchPath('latest'),
    ]),
    // check when the schedule was updated
    // compare against the latest update to the actual schedule
    ([schedule, latest]) => !schedule || ((schedule.updatedAt || 0) < (latest || 1)) ?
        // if the schedule has updates, fetch them
        fetchPath('schedule')
        :
        // otherwise use existing schedule
        schedule,
    setScheduleStorage,
);

export const selectOrUnselectBreakout = select => breakout => asyncPipe(
    fetchSchedule(),
    schedule => ({
        ...schedule,
        days: schedule.days.map(day => ({
            ...day,
            events: day.events.map(event => (
                (
                    (event.type || '').match(/breakout/i)
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
    }),
    setScheduleStorage,
);

export const submitReview = async review => asyncPipe(
    axios.post('https://northstarconferenceadmin.herokuapp.com/api/review', review),
    () => true,
);

