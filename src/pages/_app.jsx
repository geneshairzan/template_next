import "../../public/assets/css/global.css";
import Layout from "@/component/layout";
import React, { useState, useEffect } from "react";

import Context from "@context/app";
import useauth from "@context/reducer/useauth";
import useapp from "@context/reducer/useapp";
import ThemeProvider from "@context/theme";
import AppMiddleware from "@/component/middleware/client";
import { useRouter } from "next/router";
import UI from "@gh/ui";

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
          <UI.Col
            height={"100dvh"}
            overflow={"hidden"}
            width={"100vw"}
            bgcolor="smart.dark"
            center
            // px={{ xs: 1.5, md: 5 }}
          >
            <Component {...pageProps} key={loc?.asPath} />
          </UI.Col>
        </AppMiddleware>
      </ThemeProvider>
    </Context.Provider>
  );
}
