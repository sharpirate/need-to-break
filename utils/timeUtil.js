export function parseTime(time) {
  // convert "12:30" to [12, 30]
  // convert [12, 30] to "12:30"
  return typeof time === 'string' ? time.split(':').map(item => Number(item)) : time.map(item => getTwoDigitTime(item)).join(':');
}

export function getTwoDigitTime(time) {
  return time < 10 ? `0${time}` : time;
}

export function parseTimestampToTime(timestamp) {
  const date = new Date(timestamp);
  const hours = getTwoDigitTime(date.getHours());
  const minutes = getTwoDigitTime(date.getMinutes());
  return `${hours}:${minutes}`;
}