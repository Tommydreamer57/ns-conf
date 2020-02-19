import { Alert } from "react-native";

export const pipe = (arg, cb, ...callbacks) => {
    const val = cb(arg);
    return callbacks.length ?
        pipe(val, ...callbacks)
        :
        val;
}

export const compose = (...callbacks) => arg => pipe(arg, ...callbacks);

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

export const apply = (...vals) => (...args) => vals[vals.length - 1](
    ...vals.slice(0, vals.length - 1),
    ...args,
);

export const tap = cb => arg => {
    cb(arg);
    return arg;
}

export const asyncTap = cb => async arg => {
    await cb(arg);
    return arg;
}
