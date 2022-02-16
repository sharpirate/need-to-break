export function parseTime(time) {
  // convert "12:30" to [12, 30]
  // convert [12, 30] to "12:30"
  return typeof time === 'string' ? time.split(':').map(item => Number(item)) : time.map(item => getTwoDigitTime(item)).join(':');
}

export function getTwoDigitTime(time) {
  return time < 10 ? `0${time}` : time;
}

export function timestampToString(timestamp) {
  const date = new Date(timestamp);
  const hours = getTwoDigitTime(date.getHours());
  const minutes = getTwoDigitTime(date.getMinutes());
  return `${hours}:${minutes}`;
}

export function get12HourTime(time) {
  const [hour, min] = typeof time === 'string' ? parseTime(time) : time;

  let resultHour;
  let suffix;

  if (hour >= 0 && hour <= 11) {
    if (hour === 0) {
      resultHour = 12;
    } else {
      resultHour = hour;
    }
    suffix = 'AM';
  } else {
    if (hour === 12) {
      resultHour = hour;
    } else {
      resultHour = hour - 12;
    }
    suffix = 'PM';
  }

  return [getTwoDigitTime(resultHour), getTwoDigitTime(min), suffix];
}