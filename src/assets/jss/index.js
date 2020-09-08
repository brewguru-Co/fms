export const hexToRgb = (input) => {
  input = input + "";
  input = input.replace("#", "");
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error("input is not a valid hex color.");
  }
  if (input.length === 3) {
    let first = input[0];
    let second = input[1];
    let last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase();
  let first = input[0] + input[1];
  let second = input[2] + input[3];
  let last = input[4] + input[5];
  return (
    parseInt(first, 16) +
    ", " +
    parseInt(second, 16) +
    ", " +
    parseInt(last, 16)
  );
};

export const DRAWER_WIDTH = 250;

/* Color - https://yeun.github.io/open-color/ */
export const WHITE = "#fff";
export const BLACK = "#000";
export const INDIGO = [
  "#edf2ff",
  "#dbe4ff",
  "#bac8ff",
  "#91a7ff",
  "#748ffc",
  "#5c7cfa",
  "#4c6ef5",
  "#4263eb",
  "#3b5bdb",
  "#364fc7",
];
export const GRAY = [
  "#f8f9fa",
  "#f1f3f5",
  "#e9ecef",
  "#dee2e6",
  "#ced4da",
  "#adb5bd",
  "#868e96",
  "#495057",
  "#343a40",
  "#212529",
];
export const RED = [
  "#fff5f5",
  "#ffe3e3",
  "#ffc9c9",
  "#ffa8a8",
  "#ff8787",
  "#ff6b6b",
  "#fa5252",
  "#f03e3e",
  "#e03131",
  "#c92a2a",
];
export const ORANGE = [
  "#fff4e6",
  "#ffe8cc",
  "#ffd8a8",
  "#ffc078",
  "#ffa94d",
  "#ff922b",
  "#fd7e14",
  "#f76707",
  "#e8590c",
  "#d9480f",
];
export const YELLOW = [
  "#fff9db",
  "#fff3bf",
  "#ffec99",
  "#ffe066",
  "#ffd43b",
  "#fcc419",
  "#fab005",
  "#f59f00",
  "#f08c00",
  "#e67700",
];
export const GREEN = [
  "#ebfbee",
  "#d3f9d8",
  "#b2f2bb",
  "#8ce99a",
  "#69db7c",
  "#51cf66",
  "#40c057",
  "#37b24d",
  "#2f9e44",
  "#2b8a3e",
];
export const BRAND = "#ea684b";
export const BRAND_GREEN = ["#68b82e", "#00723a", "#00694d"];
export const BRAND_YELLOW = ["#fae600", "#f3ae00", "#f39a00"];
export const BRAND_PINK = ["#d95097", "#a0005b", "#720056"];
export const BRAND_ORANGE = ["#f5a21b", "#ed6b00", "#ea5607"];

/* boxShadow */
export const boxShadow = {
  boxShadow: `0 10px 30px -12px rgba(${hexToRgb(BLACK)}, 0.42),
    0 4px 25px 0px rgba(${hexToRgb(BLACK)}, 0.12),
    0 8px 10px -5px rgba(${hexToRgb(BLACK)}, 0.2)`,
};
export const indigoBoxShadow = {
  boxShadow: `0 4px 20px 0 rgba(${hexToRgb(BLACK)}, 0.14),
     0 7px 10px -5px rgba(${hexToRgb(INDIGO[6])}, 0.4)`,
};
export const grayBoxShadow = {
  boxShadow: `0 4px 20px 0 rgba(${hexToRgb(BLACK)}, 0.14),
     0 7px 10px -5px rgba(${hexToRgb(GRAY[6])}, 0.4)`,
};
export const redBoxShadow = {
  boxShadow: `0 4px 20px 0 rgba(${hexToRgb(BLACK)}, 0.14),
     0 7px 10px -5px rgba(${hexToRgb(RED[6])}, 0.4)`,
};
export const orangeBoxShadow = {
  boxShadow: `0 4px 20px 0 rgba(${hexToRgb(BLACK)}, 0.14),
     0 7px 10px -5px rgba(${hexToRgb(ORANGE[6])}, 0.4)`,
};
export const yellowBoxShadow = {
  boxShadow: `0 4px 20px 0 rgba(${hexToRgb(BLACK)}, 0.14),
     0 7px 10px -5px rgba(${hexToRgb(YELLOW[6])}, 0.4)`,
};
export const greenBoxShadow = {
  boxShadow: `0 4px 20px 0 rgba(${hexToRgb(BLACK)}, 0.14),
     0 7px 10px -5px rgba(${hexToRgb(GREEN[6])}, 0.4)`,
};
export const bGreenBoxShadow = {
  boxShadow: `0 4px 20px 0 rgba(${hexToRgb(BLACK)}, 0.14),
     0 7px 10px -5px rgba(${hexToRgb(BRAND_GREEN[0])}, 0.4)`,
};
export const bYellowBoxShadow = {
  boxShadow: `0 4px 20px 0 rgba(${hexToRgb(BLACK)}, 0.14),
     0 7px 10px -5px rgba(${hexToRgb(BRAND_YELLOW[0])}, 0.4)`,
};
export const bPinkBoxShadow = {
  boxShadow: `0 4px 20px 0 rgba(${hexToRgb(BLACK)}, 0.14),
     0 7px 10px -5px rgba(${hexToRgb(BRAND_PINK[0])}, 0.4)`,
};
export const bOrangeBoxShadow = {
  boxShadow: `0 4px 20px 0 rgba(${hexToRgb(BLACK)}, 0.14),
     0 7px 10px -5px rgba(${hexToRgb(BRAND_ORANGE[0])}, 0.4)`,
};

/* CardHeader */
export const indigoCardHeader = {
  background: `linear-gradient(60deg, ${INDIGO[6]}, ${INDIGO[8]})`,
  ...indigoBoxShadow,
};
export const grayCardHeader = {
  background: `linear-gradient(60deg, ${GRAY[6]}, ${GRAY[8]})`,
  ...grayBoxShadow,
};
export const redCardHeader = {
  background: `linear-gradient(60deg, ${RED[6]}, ${RED[8]})`,
  ...redBoxShadow,
};
export const orangeCardHeader = {
  background: `linear-gradient(60deg, ${ORANGE[6]}, ${ORANGE[8]})`,
  ...orangeBoxShadow,
};
export const yellowCardHeader = {
  background: `linear-gradient(60deg, ${YELLOW[6]}, ${YELLOW[8]})`,
  ...yellowBoxShadow,
};
export const greenCardHeader = {
  background: `linear-gradient(60deg, ${GREEN[6]}, ${GREEN[8]})`,
  ...greenBoxShadow,
};
export const bOrangeCardHeader = {
  background: `linear-gradient(60deg, ${BRAND_ORANGE[0]}, ${BRAND_ORANGE[1]})`,
  ...bOrangeBoxShadow,
};
export const bYellowCardHeader = {
  background: `linear-gradient(60deg, ${BRAND_YELLOW[0]}, ${BRAND_YELLOW[1]})`,
  ...bYellowBoxShadow,
};
export const bGreenCardHeader = {
  background: `linear-gradient(60deg, ${BRAND_GREEN[0]}, ${BRAND_GREEN[1]})`,
  ...bGreenBoxShadow,
};
export const bPinkCardHeader = {
  background: `linear-gradient(60deg, ${BRAND_PINK[0]}, ${BRAND_PINK[1]})`,
  ...bPinkBoxShadow,
};
