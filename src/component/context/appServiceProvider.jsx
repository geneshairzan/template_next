import Context from "./app";
import ThemeProvider from "./theme";
import useauth from "./reducer/useauth";
import React, { useState } from "react";

export default function App(props) {
  const [app, setapp] = useState({});
  const auth = useauth();

  return (
    <Context.Provider
      value={{
        auth,
        app,
        setapp,
      }}
    >
      <ThemeProvider>{props.children}</ThemeProvider>
    </Context.Provider>
  );
}
