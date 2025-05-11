import React, { useState } from "react";

import UI from "@gh/ui";

import Context from "@context";

import ModalLogin from "@gh/modalLogin";
import Link from "next/link";

import { AppBar } from "@mui/material";

export default function App({ grey = false }) {
  const { auth } = React.useContext(Context);
  return (
    <UI.Row
      sx={{
        width: "100%",
        height: 64,
        // bgcolor: "red",
        flexShrink: 0,
      }}
    ></UI.Row>
  );
}
