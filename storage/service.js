import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { apply, asyncPipe } from '../utils/pipe';

// AsyncStorage.clear();

// CONSTANTS

const keys = {
    timestamp: 'timestamp',
    schedule: 'schedule',
    feedback: 'feedback',
    selections: 'selections',
};

Object.entries(keys).forEach(([key, value]) => {
    if (key !== value) throw new Error(`Key ${key} !== value ${value}`);
});

const validateKey = key => {
    if (key in keys) return key;
    else throw new Error(`Invalid key: ${key}`);
}

// UTILS

const getItemFromStorage = key => asyncPipe(
    validateKey(key),
    AsyncStorage.getItem,
    JSON.parse,
);

const setItemInStorage = (key, value) => asyncPipe(
    value,
    JSON.stringify,
    apply(key, AsyncStorage.setItem),
    () => value,
);

const fetchItem = key => asyncPipe(
    axios.get(`http://ns-conf.lowrysoftware.com/api/${key}`),
    ({ data }) => data,
    apply(key, setItemInStorage),
);

const shouldRefetch = () => asyncPipe(
    Promise.all([
        // check timestamp in storage
        getItemFromStorage(keys.timestamp),
        // check timestamp of latest update
        fetchItem(keys.timestamp),
    ]),
    // compare timestamps
    ([storageTimestamp = 0, timestamp = 1]) => storageTimestamp < timestamp,
);

const getItem = key => asyncPipe(
    shouldRefetch(),
    should => should ?
        fetchItem(key)
        :
        getItemFromStorage(key),
    apply(key, setItemInStorage),
);

// ACTIONS

export const getFeedback = () => getItem(keys.feedback);
export const getSchedule = () => getItem(keys.schedule);
export const getSelections = () => getItemFromStorage(keys.selections);

export const hashBreakout = ({ day, time } = {}) => `<${day}><${time}>`;

export const selectOrUnselectBreakout = (select, { day, time, room }) => asyncPipe(
    getItemFromStorage(keys.selections),
    selections => ({
        ...selections,
        [hashBreakout({ day, time })]: select ? room : undefined,
    }),
    apply(keys.selections, setItemInStorage)
);
