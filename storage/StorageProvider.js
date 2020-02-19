import React, { createContext, useEffect, useState } from 'react';
import { apply, compose, tap } from '../utils/pipe';
import getSpeakersFromSchedule from './get-speakers-from-schedule';
import hashEvents from './hash-events';
import mapSelectionsOntoSchedule from './map-selections-onto-schedule';
import { getFeedback, getSchedule, getSelections, selectOrUnselectBreakout } from './service';

export const StorageContext = createContext();

export const StorageConsumer = StorageContext.Consumer;

export default function StorageProvider({
    children,
}) {
    const [loading, setLoading] = useState(true);
    const [scheduleWithoutSelections, setSchedule] = useState({});
    const [selections, setSelections] = useState({});
    const [feedback, setFeedback] = useState({});
    const [speakers, setSpeakers] = useState([]);

    useEffect(() => {
        Promise.all([
            getFeedback().then(setFeedback),
            getSelections().then(setSelections),
            getSchedule().then(compose(
                tap(setSchedule),
                tap(compose(
                    getSpeakersFromSchedule,
                    setSpeakers,
                )),
            )),
        ]).then(apply(false, setLoading));
    }, []);

    const selectOrUnselectBreakoutSession = select => breakout => selectOrUnselectBreakout(select, breakout).then(setSelections);

    const selectBreakout = selectOrUnselectBreakoutSession(true);
    const unselectBreakout = selectOrUnselectBreakoutSession(false);

    const schedule = mapSelectionsOntoSchedule(selections, scheduleWithoutSelections);
    const hashedEvents = hashEvents(schedule);

    return loading ? null : (
        <StorageContext.Provider
            value={{
                schedule,
                speakers,
                feedback,
                hashedEvents,
                selectBreakout,
                unselectBreakout,
            }}
        >
            {children}
        </StorageContext.Provider>
    );
}
