import { getColor } from "../";

const editableTableStyle = () => ({
  header: {
    display: "flex",
    alignItems: "center",
  },
  headerContent: {
    flex: "1 1 100%",
  },
  add: {
    color: "#fff",
  },
  tableHeader: {
    fontWeight: "bold",
    color: (props) => getColor(props.color),
  },
  title: {
    color: "#fff",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "500",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  category: {
    color: `rgba(255, 255, 255, 0.62)`,
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
});

export default editableTableStyle;
