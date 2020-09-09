import { INDIGO, GRAY, WHITE } from "../";

const notificationRecordStyle = {
  root: {
    padding: 8,
    position: "relative",
    // background: `linear-gradient(90deg, ${INDIGO[8]} 1%, ${WHITE} 1%)`,
  },
  title: {
    textAlign: "center",
    color: GRAY[7],
    fontWeight: "Bold",
    fontSize: 16,
  },
  content: {
    paddingLeft: 5,
    color: GRAY[7],
    fontSize: 14,
  },
  time: {
    display: "inline-block",
    color: GRAY[5],
    fontSize: 14,
  },
  warn: {
    margin: "auto",
    width: 30,
    height: 30,
    color: INDIGO[8],
    backgroundColor: WHITE,
  },
  timer: {
    display: "inline-block",
    width: 20,
    height: 20,
    color: GRAY[5],
  },
};

export default notificationRecordStyle;
