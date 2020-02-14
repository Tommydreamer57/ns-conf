
export const extractSessionType = ({ sessiontype = '' } = {}) => `${
    sessiontype.slice(0, 1).toUpperCase()
    }${
    sessiontype.slice(1).toLowerCase()
    }`;

export const isKeynote = ({ sessiontype = '' } = {}) => sessiontype.match(/keynote/i);

export const extractSessionDay = ({ sessiontype = '' } = {}) => isKeynote({ sessiontype }) ?
    sessiontype.replace(/\D/g, '') < 2.5 ?
        'Monday'
        :
        'Saturday'
    :
    sessiontype.replace(/\D/g, '') < 3.5 ?
        'Friday'
        :
        'Saturday';

const getSessionNumber = ({ sessiontype = '' }) => +sessiontype.replace(/\D/g, '');

const getSessionDay = ({ sessiontype = '' }) => sessiontype.match(/breakout/i) ?
    getSessionNumber({ sessiontype }) < 4 ?
        'Friday'
        :
        'Saturday'
    :
    sessiontype.match(/keynote/i) ?
        getSessionNumber({ sessiontype }) < 3 ?
            'Friday'
            :
            'Saturday'
        :
        '';

const getTimeNumber = ({ sessiontime = '', time = '' }) => {
    const timeString = (sessiontime || time).replace(/^\s*(\d+:\d+\s*(am|pm)?).*$/i, '$1');
    const am = !!timeString.match(/am/i);
    const hours = +timeString.replace(/:.*/, '') || 0;
    const minutes = +timeString.replace(/.*:/, '') || 0;
    return (
        hours
        +
        (minutes / 60)
        +
        (am ? 0 : 12)
    );
}

const dayValues = {
    thursday: 100,
    friday: 200,
    saturday: 300,
    sunday: 400,
};

export const getSessionOrSocialDay = sessionOrSocial => sessionOrSocial.day || getSessionDay(sessionOrSocial) || '';

export const getScheduleRank = sessionOrSocial => {
    const day = getSessionOrSocialDay(sessionOrSocial);
    const dayValue = dayValues[day.toLowerCase()] || 500;
    const time = getTimeNumber(sessionOrSocial);
    return dayValue + time;
}

export const isSocial = ({ type }) => type;

export const sortSchedule = ({ sessions, socials }) => [...sessions, ...socials].sort((a, b) => (
    getScheduleRank(a)
    -
    getScheduleRank(b)
));

export const numberDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

export const getCurrentDay = () => {
    const date = new Date();
    const day = date.getDay();
    return numberDays[day];
}
