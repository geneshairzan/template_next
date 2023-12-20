import React from "react";
import { Button, Stack } from "@mui/material";
import Context from "@context/app";
import CircularProgress from "@mui/material/CircularProgress";

export default function App({ small, label, children, ...props }) {
  const { app } = React.useContext(Context);
  return (
    <Button
      {...props}
      disabled={props.type == "submit" && app.isLoading}
      sx={{
        width: small && "180px",
      }}
      startIcon={
        props.type == "submit" && app.isLoading ? <CircularProgress size={"14px"} color="pwhite" /> : props.startIcon
      }
    >
      {children}
    </Button>
  );
}
