import React, { useState } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
import { Tabs, Tab } from "@mui/material";
import Info from "./info";
import Device from "./device";
import Room from "./room";
import Member from "./member";
import { useRouter } from "next/router";
import Context from "@context/app";
import useFetch, { fetcher } from "@gh/helper/useFetch";

export default function App(props) {
  const { auth } = React.useContext(Context);
  const data = useFetch({ url: `family/me` });
  const router = useRouter();
  const [tab, settab] = useState(router?.query?.on * 1 || 0);
  return (
    <UI.Col
      sx={{
        height: "100%",
        width: "100%",
        bgcolor: "#2a2d2e",
      }}
      center
    >
      <UI.Col
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          fontSize: 160,
          zIndex: 1,
          color: "black",
          opacity: 0.1,
          fontWeight: "bold",
        }}
      >
        {data?.get()?.name}
      </UI.Col>
      <UI.Stack
        sx={{
          minHeight: "calc(100dvh)",
          width: "100vw",
          maxWidth: 1280,
          py: "5vh",
          zIndex: 2,
        }}
      >
        <UI.Col>
          <UI.Row justifyContent="space-between" alignItems="flex-start">
            <UI.Text variant="body1">Welcome, {auth?.user?.name}</UI.Text>
            <UI.Button
              onClick={() => auth.signout()}
              variant="outlined"
              startIcon={<Icon.Power />}
              sx={{
                color: "smart.main",
                "&:hover": {
                  color: "#6f4f27",
                },
              }}
            >
              Signout
            </UI.Button>
          </UI.Row>

          <UI.Text variant="h2" color="smart.main" bold>
            Family Configuration
          </UI.Text>
        </UI.Col>
        <Tabs value={tab} onChange={(e, v) => settab(v)} aria-label="basic tabs example">
          <Tab label="Info" />
          <Tab label="Room" />
          <Tab label="Devices" />
          <Tab label="Member" />
        </Tabs>
        {tab == 0 && <Info data={data?.get()} />}
        {tab == 1 && <Room />}
        {tab == 2 && <Device />}
        {tab == 3 && <Member />}
      </UI.Stack>
    </UI.Col>
  );
}
