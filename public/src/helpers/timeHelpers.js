function secondsToTime (secondsAmount) {
    var days  = 1,
        hours = Math.floor (secondsAmount / 3600),
        minutes = Math.floor ((secondsAmount % 3600) / 60),
        seconds = Math.floor ((secondsAmount % 3600) % 60);

    return new Date(1970, 0, days, hours, minutes, seconds);
};

function timeToSeconds (timeString) {
    var hours = 0,
        minutes = 0,
        seconds = 0;
    if (timeString) {
        hours = timeString.getHours();
        minutes = timeString.getMinutes();
        seconds = timeString.getSeconds();
    }
    return hours + 3600 + minutes * 60 + seconds;
};