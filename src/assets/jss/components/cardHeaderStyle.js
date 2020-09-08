import {
  indigoCardHeader,
  orangeCardHeader,
  grayCardHeader,
  redCardHeader,
  yellowCardHeader,
  greenCardHeader,
  bGreenCardHeader,
  bYellowCardHeader,
  bPinkCardHeader,
  bOrangeCardHeader,
  WHITE,
} from "../";

const cardHeaderStyle = {
  cardHeader: {
    padding: "0.75rem 1.25rem",
    marginBottom: "0",
    borderBottom: "none",
    background: "transparent",
    zIndex: "3 !important",
    "&$cardHeaderPlain,&$cardHeaderIcon,&$cardHeaderStats,&$indigoCardHeader,&$orangeCardHeader,&$grayCardHeader,&$redCardHeader,&$yellowCardHeader,&$greenCardHeader,&$bGreenCardHeader,&$bYellowCardHeader,&$bPinkCardHeader,&$bOrangeCardHeader": {
      margin: "0 15px",
      padding: "0",
      position: "relative",
      color: WHITE,
    },
    "&:first-child": {
      borderRadius: "calc(.25rem - 1px) calc(.25rem - 1px) 0 0",
    },
    "&$indigoCardHeader,&$orangeCardHeader,&$grayCardHeader,&$redCardHeader,&$yellowCardHeader,&$greenCardHeader,&$bGreenCardHeader,&$bYellowCardHeader,&$bPinkCardHeader,&$bOrangeCardHeader": {
      "&:not($cardHeaderIcon)": {
        borderRadius: "3px",
        marginTop: "-20px",
        padding: "15px",
      },
    },
    "&$cardHeaderStats": {
      textAlign: "right",
      "& svg": {
        fontSize: "36px",
        lineHeight: "56px",
        textAlign: "center",
        width: "36px",
        height: "36px",
        margin: "10px 10px 4px",
      },
    },
  },
  cardHeaderPlain: {
    marginLeft: "0px !important",
    marginRight: "0px !important",
  },
  cardHeaderIcon: {
    "&$indigoCardHeader,&$orangeCardHeader,&$grayCardHeader,&$redCardHeader,&$yellowCardHeader,&$greenCardHeader,&$bGreenCardHeader,&$bYellowCardHeader,&$bPinkCardHeader,&$bOrangeCardHeader": {
      background: "transparent",
      boxShadow: "none",
    },
    "& .material-icons": {
      width: "33px",
      height: "33px",
      textAlign: "center",
      lineHeight: "33px",
    },
  },
  cardHeaderStats: {
    "& $cardHeaderIcon": {
      textAlign: "right",
    },
    "& h1,& h2,& h3,& h4,& h5,& h6": {
      margin: "0 !important",
    },
  },
  indigoCardHeader: {
    color: WHITE,
    "&:not($cardHeaderIcon)": {
      ...indigoCardHeader,
    },
  },
  grayCardHeader: {
    color: WHITE,
    "&:not($cardHeaderIcon)": {
      ...grayCardHeader,
    },
  },
  redCardHeader: {
    color: WHITE,
    "&:not($cardHeaderIcon)": {
      ...redCardHeader,
    },
  },
  orangeCardHeader: {
    color: WHITE,
    "&:not($cardHeaderIcon)": {
      ...orangeCardHeader,
    },
  },
  yellowCardHeader: {
    color: WHITE,
    "&:not($cardHeaderIcon)": {
      ...yellowCardHeader,
    },
  },
  greenCardHeader: {
    color: WHITE,
    "&:not($cardHeaderIcon)": {
      ...greenCardHeader,
    },
  },
  bGreenCardHeader: {
    color: WHITE,
    "&:not($cardHeaderIcon)": {
      ...bGreenCardHeader,
    },
  },
  bYellowCardHeader: {
    color: WHITE,
    "&:not($cardHeaderIcon)": {
      ...bYellowCardHeader,
    },
  },
  bPinkCardHeader: {
    color: WHITE,
    "&:not($cardHeaderIcon)": {
      ...bPinkCardHeader,
    },
  },
  bOrangeCardHeader: {
    color: WHITE,
    "&:not($cardHeaderIcon)": {
      ...bOrangeCardHeader,
    },
  },
};

export default cardHeaderStyle;
