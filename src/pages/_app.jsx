import "../../public/assets/css/global.css";
import Layout from "@/component/layout";
import React, { useState, useEffect } from "react";

import Context from "@context/app";
import useauth from "@context/reducer/useauth";
import useapp from "@context/reducer/useapp";
import ThemeProvider from "@context/theme";
import AppMiddleware from "@/__middleware/client";

export default function MyApp({ Component, pageProps }) {
  const auth = useauth();
  const app = useapp();

  if (auth?.user == "loading") return <></>;
  console.log(auth?.user);
  return (
    <Context.Provider
      value={{
        auth,
        app,
      }}
    >
      <ThemeProvider>
        <AppMiddleware>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppMiddleware>
      </ThemeProvider>
    </Context.Provider>
  );
}
