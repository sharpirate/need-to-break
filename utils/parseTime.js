export default function parseTime(time) {
  // convert "12:30" to [12, 30]
  // convert [12, 30] to "12:30"
  return typeof time === 'string' ? time.split(':') : time.join(':');
}