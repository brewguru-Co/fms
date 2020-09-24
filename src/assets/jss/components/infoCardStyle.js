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
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
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
    display: "inline-flex",
    width: "100%",
    justifyContent: "space-between",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
  },
};
export default infoCardStyle;
