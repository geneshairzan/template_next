import React from "react";
import UI from "@gh/ui";
import Context from "@context";
import Header from "./header";
import Menu, { MenuDrawer } from "./mainMenu";
import useSwitch from "@gh/useSwitch";
import { useMediaQuery } from "@mui/material";

export default function Layout(props) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md")); // Adjust breakpoint as needed
  const { app, r } = React.useContext(Context);
  const menuopen = useSwitch(isMobile ? false : true);

  function withMenu(params) {
    if (r.asPath.includes("/project/")) return false;
    if (r.asPath.includes("/print/")) return false;
    return true;
  }

  return (
    <UI.Col
      alignItems="center"
      width={"100%"}
      maxHeight={"100dvh"}
      height={{ xs: app.mobilescreenheight, md: "100dvh" }}
      sx={{
        position: "absolute",
        overflow: "auto",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        bgcolor: "#fafafa",
      }}
    >
      <UI.Col
        sx={{
          width: "100dvw",
          height: "100dvh",
          overflow: "auto",
        }}
      >
        <UI.Row
          sx={{
            flex: 1,
            flexGrow: 1,
            maxHeight: "100dvh",
          }}
        >
          {withMenu() && <MenuDrawer open={menuopen} />}
          <UI.Col
            sx={{
              flex: 1,
              overflow: "auto",
            }}
          >
            {props.children}
          </UI.Col>
        </UI.Row>
      </UI.Col>

      {app?.fetcherCallback != null && <UI.FetcherCallback type={app?.fetcherCallback.type} message={app?.fetcherCallback.message} />}
    </UI.Col>
  );
}
