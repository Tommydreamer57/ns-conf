import React, { createContext, useEffect, useState } from 'react';
import { asyncPipe, asyncTap, pipe } from '../utils/pipe';
import getSpeakersFromSchedule from './get-speakers-from-schedule';
import { getSchedule, selectOrUnselectBreakout, getFeedback } from './service';
import mapDaysThroughSchedule from './map-days-through-schedule';
import isBreakoutSelected from './is-breakout-selected';
import getBreakoutParent from './get-breakout-parent';
import hashEvents from './hash-events';

export const StorageContext = createContext();

export const StorageConsumer = StorageContext.Consumer;

export default function StorageProvider({
    children,
}) {
    const [schedule, setSchedule] = useState({});
    const [feedback, setFeedback] = useState({});
    const [speakers, setSpeakers] = useState([]);
    const [hashedEvents, setHashedEvents] = useState({});

    useEffect(() => {
        asyncPipe(
            getSchedule(),
            mapDaysThroughSchedule,
            asyncTap(setSchedule),
            asyncTap(schedule => pipe(
                schedule,
                hashEvents,
                setHashedEvents,
            )),
            getSpeakersFromSchedule,
            asyncTap(setSpeakers),
        );
        asyncPipe(
            getFeedback(),
            setFeedback,
        );
    }, []);

    const selectOrUnselectBreakoutSession = select => breakout => asyncPipe(
        selectOrUnselectBreakout(select)(breakout),
        setSchedule,
    );

    const selectBreakout = selectOrUnselectBreakoutSession(true);
    const unselectBreakout = selectOrUnselectBreakoutSession(false);

    const isSelected = isBreakoutSelected(schedule);
    const getBreakout = getBreakoutParent(schedule);

    return (
        <StorageContext.Provider
            value={{
                schedule,
                speakers,
                feedback,
                hashedEvents,
                selectBreakout,
                unselectBreakout,
                isSelected,
                getBreakout,
            }}
        >
            {children}
        </StorageContext.Provider>
    );
}
