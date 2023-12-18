import Context from "@context";
import ThemeProvider from "./theme";
import React, { useState } from "react";

export default function App(props) {
  const [app, setapp] = useState({});

  return (
    <Context.Provider
      value={{
        app,
        setapp,
      }}
    >
      <ThemeProvider>{props.children}</ThemeProvider>
    </Context.Provider>
  );
}
