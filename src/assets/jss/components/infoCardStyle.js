import { GRAY } from "../";

const infoCardStyle = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    justifyContent: "flex-end",
  },
  skeleton: {
    margin: 0,
    marginTop: 10,
    marginBottom: 0,
    width: 100,
    height: 14,
  },
  count: {
    margin: "0 0.4rem",
    textAlign: "center",
    "& p": {
      color: GRAY[7],
      fontWeight: 600,
    },
    "& span": {
      color: GRAY[5],
      fontSize: "1rem",
    },
  },
  number: {
    color: `${GRAY[6]} !important`,
    fontSize: "2rem !important",
  },
  title: {
    color: GRAY[6],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    marginBottom: "3px",
    textDecoration: "none",
  },
  category: {
    color: GRAY[5],
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
    paddingTop: "10px",
  },
  stats: {
    color: GRAY[5],
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    lineHeight: "22px",
    "& svg": {
      top: "2px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "2px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
  },
  text: {
    color: GRAY[7],
    fontSize: 14,
  },
};
export default infoCardStyle;
