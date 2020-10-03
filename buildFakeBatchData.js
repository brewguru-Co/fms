function oneDimensional(x1, x2, y1, y2) {
  const a = (y2 - y1) / (x2 - x1);
  const b = y1 - a * x1;
  return (x) => a * x + b;
}

/*
 * start, end - 15분 단위
 */

function build(start, end, f) {
  const phFrom = 4.2;
  const phTo = 2.4;
  const tempFrom = 32;
  const tempTo = 24;
  const doxFrom = 10;
  const doxTo = 5;
  const brixFrom = 0.9;
  const brixTo = 0.3;
  const FIFTEEN_MINUTES = 60 * 15;
  const count = Math.floor((end - start) / FIFTEEN_MINUTES) + 1;

  const phFn = f(0, count - 1, phFrom, phTo);
  const tempFn = f(0, count - 1, tempFrom, tempTo);
  const doxFn = f(0, count - 1, doxFrom, doxTo);
  const brixFn = f(0, count - 1, brixFrom, brixTo);

  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      timestamp: start + i * FIFTEEN_MINUTES,
      ph: Number(phFn(i).toFixed(2)),
      temp: Number(tempFn(i).toFixed(2)),
      dox: Number(doxFn(i).toFixed(2)),
      brix: Number(brixFn(i).toFixed(2)),
    });
  }
  return data;
}

const start = 1601251200; // 2020-09-28 00:00 GMT
const end = 1601262000; // 2020-09-28 03:00 GMT
// const end = 1601398800;
const datas_15 = build(start, end, oneDimensional);

function filterData(datas, unit) {
  const HOUR = 60 * 60;
  const DAY = 24 * HOUR;
  const divider = unit === "hour" ? HOUR : DAY;
  return datas.filter((data) => data.timestamp % divider === 0);
}

console.log(datas_15.length);
console.log(filterData(datas_15, "hour").length);
console.log(filterData(datas_15, "day").length);
