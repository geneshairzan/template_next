import "../../public/assets/css/global.css";
import "../../public/assets/css/table.css";

import Layout from "@/component/layout";
import React, { useState, useEffect } from "react";

import Context from "@context";
import useauth from "@context/reducer/useauth";
import useapp from "@context/reducer/useapp";
import ThemeProvider from "@context/theme";
import AppMiddleware from "@/component/middleware/client";
import { useRouter } from "next/router";
import UI from "@gh/ui";
import { Snackbar, Alert } from "@mui/material";

export default function MyApp({ Component, pageProps }) {
  const loc = useRouter();
  const auth = useauth();
  const app = useapp();

  if (auth?.user == "loading") return <></>;
  return (
    <Context.Provider
      value={{
        auth,
        app,
      }}
    >
      <ThemeProvider isDark={auth?.user?.id}>
        <AppMiddleware>
          <UI.Col height={"100dvh"} overflow={"hidden"} width={"100vw"}>
            <Component {...pageProps} key={loc?.asPath} />
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={app?.get("snack")?.open}
              autoHideDuration={3000}
              onClose={app?.closeSnack}
            >
              <Alert onClose={app?.closeSnack} color="pwhite" variant="filled" sx={{ width: "100%" }}>
                {app?.get("snack")?.msg}
              </Alert>
            </Snackbar>
          </UI.Col>
        </AppMiddleware>
      </ThemeProvider>
    </Context.Provider>
  );
}
