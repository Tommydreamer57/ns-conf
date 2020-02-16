import React, { createContext, useEffect, useState } from 'react';
import { asyncPipe, asyncTap } from '../utils/pipe';
import getSpeakersFromSchedule from './get-speakers-from-schedule';
import { fetchSchedule, selectOrUnselectBreakout } from './service';
import mapDaysThroughSchedule from './map-days-through-schedule';

export const StorageContext = createContext();

export const StorageConsumer = StorageContext.Consumer;

export default function StorageProvider({
    children,
}) {
    const [schedule, setSchedule] = useState({});
    const [speakers, setSpeakers] = useState([]);


    useEffect(() => {
        asyncPipe(
            fetchSchedule(),
            mapDaysThroughSchedule,
            asyncTap(setSchedule),
            getSpeakersFromSchedule,
            asyncTap(setSpeakers),
        );
    }, []);

    const selectOrUnselectBreakoutSession = select => breakout => asyncPipe(
        selectOrUnselectBreakout(select)(breakout),
        setSchedule,
    );

    const selectBreakout = selectOrUnselectBreakoutSession(true);
    const unselectBreakout = selectOrUnselectBreakoutSession(false);

    return (
        <StorageContext.Provider
            value={{
                schedule,
                speakers,
                selectBreakout,
                unselectBreakout,
            }}
        >
            {children}
        </StorageContext.Provider>
    );
}
