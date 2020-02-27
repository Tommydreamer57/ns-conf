import React, { createContext, useEffect, useState } from 'react';
import { apply, compose, tap } from '../utils/pipe';
import getSpeakersFromSchedule from './get-speakers-from-schedule';
import hashEvents from './hash-events';
import mapSelectionsOntoSchedule from './map-selections-onto-schedule';
import { getFeedback, getHomeLinks, getSchedule, getSelections, getTimestamp, selectOrUnselectBreakout } from './service';

export const StorageContext = createContext();

export const StorageConsumer = StorageContext.Consumer;

export default function StorageProvider({
    children,
}) {
    const [timestamp, setTimestamp] = useState(0);
    const [loading, setLoading] = useState(true);
    const [scheduleWithoutSelections, setSchedule] = useState({});
    const [selections, setSelections] = useState({});
    const [feedback, setFeedback] = useState({});
    const [speakers, setSpeakers] = useState([]);
    const [homeLinks, setHomeLinks] = useState([]);

    useEffect(() => {
        Promise.all([
            getTimestamp().then(setTimestamp),
            getHomeLinks().then(setHomeLinks),
            getFeedback().then(setFeedback),
            getSelections().then(setSelections),
            getSchedule().then(compose(
                tap(setSchedule),
                getSpeakersFromSchedule,
                setSpeakers,
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
                timestamp,
                schedule,
                speakers,
                feedback,
                homeLinks,
                hashedEvents,
                selectBreakout,
                unselectBreakout,
            }}
        >
            {children}
        </StorageContext.Provider>
    );
}
