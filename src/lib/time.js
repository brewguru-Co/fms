import moment from "moment";

export function getTimeString(timestamp, format) {
  return moment(timestamp * 1000).format(format);
}

export function isToday(timestamp) {
  return moment(timestamp * 1000).isSame(moment(), "day");
}
