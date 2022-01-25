export const timeForToday = (time: Date) => {
    const today = new Date();
    const timeValue = new Date(time);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime <= 1) return 'Last updated 1 min ago';
    if (betweenTime < 60) {
        return `Last updated ${betweenTime} mins ago`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour <= 1) return 'Last updated 1 hour ago';
    if (betweenTimeHour < 24) {
        return `Last updated ${betweenTimeHour} hours ago`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay <= 1) return 'Last updated 1 day ago';
    if (betweenTimeDay < 365) {
        return `Last updated ${betweenTimeDay} days ago`;
    }

    if ((betweenTimeDay / 365) <= 1) return 'Last updated 1 year ago';
    return `Last updated ${Math.floor(betweenTimeDay / 365)} years ago`;
};