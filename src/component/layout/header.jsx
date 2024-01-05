import React, { useState } from "react";

import UI from "@gh/ui";

import Context from "@context/app";

import ModalLogin from "@gh/modalLogin";
import Link from "next/link";

import { AppBar } from "@mui/material";

export default function App({ grey = false }) {
  const { auth } = React.useContext(Context);
  return (
    <AppBar position="fixed">
      <UI.Row spacing={2} center justifyContent="space-between" px={2} py={1}>
        <ModalLogin auth={auth} setmodalOpen={() => {}} />
        <UI.Col component={Link} href="/">
          Inventory Mng.
        </UI.Col>
      </UI.Row>
    </AppBar>
  );
}
