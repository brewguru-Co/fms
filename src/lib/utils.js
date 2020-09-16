import _ from "lodash";

export const sortByKeyDesc = (objArr, key) => {
  const newObjArr = _.cloneDeep(objArr);
  newObjArr.sort((a, b) => (a[key] > b[key] ? -1 : 1));
  return newObjArr;
};

export const toPhoneString = (s) => {
  return s.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
};
