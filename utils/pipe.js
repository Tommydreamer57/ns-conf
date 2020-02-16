import { Alert } from "react-native";

export const pipe = (arg, cb, ...callbacks) => {
    const val = cb(arg);
    return callbacks.length ?
        pipe(val, ...callbacks)
        :
        val;
}

export const asyncPipe = async (promise, cb, ...callbacks) => {
    try {
        const result = await promise;
        const val = cb(result);
        return callbacks.length ?
            asyncPipe(val, ...callbacks)
            :
            val;
    } catch (err) {
        console.error(err);
        Alert.alert(err);
    }
}

export const spread = cb => argArr => cb(...argArr);

export const apply = (val, cb) => (...args) => cb(val, ...args);

export const tap = cb => arg => {
    cb(arg);
    return arg;
}

export const asyncTap = cb => async arg => {
    await cb(arg);
    return arg;
}
