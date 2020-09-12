import _ from "lodash";

export const sortByKeyDesc = (objArr, key) => {
  const newObjArr = _.cloneDeep(objArr);
  newObjArr.sort((a, b) => (a[key] > b[key] ? -1 : 1));
  return newObjArr;
};
