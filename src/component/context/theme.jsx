import * as React from "react";
import { createTheme, ThemeProvider, responsiveFontSizes, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function CustomStyles({ isDark, ...props }) {
  const color = {
    primary: {
      main: "#005c4b",
      contrastText: "#fff",
    },

    secondary: {
      main: "#402e25",
      dark: "#1c1512",
      contrastText: "#fff",
    },

    third: {
      main: "#e20547",
    },

    pwhite: {
      main: "#fff",
      dark: "#fff",
      light: "#fff",
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
    //202124
    smart: {
      main: "#d6974d",
      dark: "#1c1512",
      text: "#9f9e9c",
      textdark: "#645444",
    },

    smartSecondary: {
      main: "#402e25",
      dark: "#1c1512",
      text: "#9f9e9c",
    },

    menu: {
      bg: "#402e25",
      active: "#d6974d",
      inactive: "#1c1512",

      // text: { active: "#d6974d", inactive: "1c1512" },
    },
  };

  const themeSetup = createTheme({
    palette: {
      // mode: isDark ? "dark" : "light",
      ...color,
    },
    typography: {
      fontSize: 12,
      // h1: {
      //   fontWeight: 600,
      //   fontSize: 72,
      // },
      // h4: {
      //   fontWeight: 600,
      //   fontSize: 16,
      // },
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
