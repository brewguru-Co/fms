import {
  GRAY,
  indigoCardHeader,
  grayCardHeader,
  orangeCardHeader,
  redCardHeader,
  yellowCardHeader,
  greenCardHeader,
  bGreenCardHeader,
  bYellowCardHeader,
  bPinkCardHeader,
  bOrangeCardHeader,
} from "../";

const cardIconStyle = {
  cardIcon: {
    "&$indigoCardHeader,&$orangeCardHeader,&$grayCardHeader,&$redCardHeader,&$yellowCardHeader,&$greenCardHeader,&$bGreenCardHeader,&$bYellowCardHeader,&$bPinkCardHeader,&$bOrangeCardHeader": {
      borderRadius: "3px",
      backgroundColor: GRAY[0],
      padding: "15px",
      marginTop: "-20px",
      marginRight: "15px",
      float: "left",
    },
  },
  indigoCardHeader,
  grayCardHeader,
  orangeCardHeader,
  redCardHeader,
  yellowCardHeader,
  greenCardHeader,
  bGreenCardHeader,
  bYellowCardHeader,
  bPinkCardHeader,
  bOrangeCardHeader,
};

export default cardIconStyle;
