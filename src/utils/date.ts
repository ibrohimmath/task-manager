const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function addDays(date: Date, days: number) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

function getRemainTime(date1: Date, date2: Date, type: 'day' | 'hour' | 'minute' = 'day') {
    let diff = date2.getTime() - date1.getTime();
    if (diff < 0) diff = 0;
    return displayTime(diff, type);
}

function displayTime(diff: number, type: 'day' | 'hour' | 'minute' = 'day') {
    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    if (type === 'day') {
        return `${totalDays} day${makePlural(totalDays)}`;
    }

    if (type === 'hour') {
        return `${totalHours} hour${makePlural(totalHours)}`;
    }

    if (type === 'minute') {
        return `${totalMinutes} minute${makePlural(totalMinutes)}`;
    }

    return "";
}

function makePlural(amount: number) {
    return amount === 1 ? '' : 's';
}

export {

    addDays, calculateDiff, dayNames, displayTime, getRemainTime, monthNames
};

