import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ee866f",
      main: "#ea684b",
      dark: "#a34834",
      contrastText: "#fff",
    },
  },
});

function CThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default CThemeProvider;
