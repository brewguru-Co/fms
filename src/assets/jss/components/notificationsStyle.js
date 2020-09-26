import { WHITE, hexToRgb } from "..";

const notificationsStyle = {
  title: {
    color: WHITE,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "500",
    marginBottom: "3px",
    textDecoration: "none",
  },
  category: {
    color: `rgba(${hexToRgb(WHITE)}, 0.62)`,
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
};

export default notificationsStyle;
