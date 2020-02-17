import axios from 'axios';
import { AsyncStorage, Alert } from 'react-native';
import { asyncPipe, asyncTap, apply } from '../utils/pipe';
import addOrRemoveBreakout from './add-or-remove-breakout';

// CONSTANTS

const baseURL = 'http://ns-conf.lowrysoftware.com/api';

const keys = {
    timestamp: 'timestamp',
    schedule: 'schedule',
    feedback: 'feedback',
};

const validateKey = key => {
    if (key in keys) return key;
    else throw new Error(`Invalid key: ${key}`);
}

// UTILS

const fetchItem = key => asyncPipe(
    axios.get(`${baseURL}/${validateKey(key)}`),
    ({ data }) => data,
    apply(key, setItemInStorage),
);

const getItemFromStorage = key => asyncPipe(
    AsyncStorage.getItem(validateKey(key)),
    JSON.parse,
);

const setItemInStorage = (key, value) => asyncPipe(
    AsyncStorage.setItem(validateKey(key), JSON.stringify(value)),
    () => value,
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
    asyncTap(should => should && Alert.alert('Refetching')),
    should => should ?
        fetchItem(key)
        :
        getItemFromStorage(key),
    apply(key, setItemInStorage),
);

// ACTIONS

export const getSchedule = () => getItem(keys.schedule);
export const getFeedback = () => getItem(keys.feedback);

export const selectOrUnselectBreakout = select => breakout => asyncPipe(
    getSchedule(),
    addOrRemoveBreakout(select, breakout),
    apply(keys.schedule, setItemInStorage),
);
