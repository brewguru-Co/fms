import { GRAY } from "..";
const optimalCardStyle = {
  title: {
    color: GRAY[6],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "500",
    marginBottom: "3px",
    textDecoration: "none",
    fontSize: "2rem",
  },
  category: {
    color: GRAY[5],
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
    paddingTop: "10px",
  },
  container: {
    display: "flex",
    justifyContent: "flex-end",
  },
  skeleton: {
    width: 60,
    height: 40,
  },
  statsTitle: {
    color: GRAY[6],
    fontSize: "14px",
  },
  stats: {
    color: GRAY[5],
    display: "inline-flex",
    fontSize: "18px",
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

export default optimalCardStyle;
