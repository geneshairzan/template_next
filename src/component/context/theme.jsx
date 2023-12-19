import * as React from "react";
import { createTheme, ThemeProvider, responsiveFontSizes, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function CustomStyles(props) {
  const color = {
    primary: {
      main: "#004378",
      dark: "#002e52",
      contrastText: "#fff",
    },

    secondary: {
      main: "#f8994c",
      dark: "#ab6934",
      contrastText: "#fff",
    },

    third: {
      main: "#f24f09",
    },

    pwhite: {
      main: "#fff",
      dark: "#fff",
      light: "#fff",
    },
    pbrown: {
      main: "#897a5f",
      dark: "#554c3b",
      contrastText: "#fff",
    },
    pgreen: {
      main: "#406860",
      dark: "#203430",
      contrastText: "#fff",
    },
    google: {
      main: "#4789f4",
      dark: "#305ea7",
      contrastText: "#fff",
    },
    error: {
      main: "#e63946",
    },
    d: {
      r: "#9d0208",
      b: "#1e6091",
      g: "#52b69a",
    },

    grey: {
      a: "#9c9fac",
      b: "#575960",
      c: "#35363a",
    },

    cv: {
      blue: "#2f4858",
      red: "#ee6c4d",
    },
  };

  const themeSetup = createTheme({
    palette: color,
    typography: {
      fontSize: 12,
    },
    components: {
      MuiTextField: {
        defaultProps: {
          size: "small",
          autoComplete: "new-password",
          inputProps: {
            autoComplete: "new-password",
            form: {
              autoComplete: "new-password",
            },
          },
        },
      },

      MuiButton: {
        defaultProps: {
          variant: "contained",
          color: "primary",
          className: "f-capitalize",
        },
        styleOverrides: {
          containedSecondary: {
            fontWeight: "bold",
          },
          containedOrange: {
            color: "white",
          },
          containedSuccess: {
            color: "white",
          },
        },
      },

      MuiTypography: {
        defaultProps: {
          body1: {
            color: "initial",
          },
          body2: {
            color: "initial",
          },
          variantMapping: {
            h1: "h1",
            h2: "h2",
            h3: "h3",
            h4: "h4",
            h5: "h5",
            h6: "h6",
            subtitle1: "p",
            subtitle2: "p",
            caption: "p",
            body1: "p",
            body2: "p",
            overline: "p",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={responsiveFontSizes(themeSetup)}>
      <CssBaseline />
      <StyledEngineProvider injectFirst>{props.children}</StyledEngineProvider>
    </ThemeProvider>
  );
}
