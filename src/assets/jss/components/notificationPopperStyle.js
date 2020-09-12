import { WHITE, GRAY, RED } from "../";

const notificationPopperStyle = (theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 2,
  },
  list: {
    minWidth: 300,
    maxWidth: 480,
  },
  icon: {
    color: WHITE,
    fontSize: 25,
  },
  badge: {
    color: RED[7],
  },
  paper: {
    padding: 8,
    backgroundColor: WHITE,
  },
  title: {
    color: GRAY[8],
    fontSize: 16,
    padding: 10,
    borderRadius: 3,
  },
  content: {
    color: GRAY[7],
    fontSize: 14,
  },
  time: {
    display: "inline-block",
    color: GRAY[5],
    fontSize: 12,
  },
});

export default notificationPopperStyle;
