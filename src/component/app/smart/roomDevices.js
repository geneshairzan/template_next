import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Icon from "@gh/icon";
import Bgimg from "@/component/app/smart/roomBg";
import ChairIcon from "@mui/icons-material/Chair";

import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/router";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { glass } from "@/component/app/smart/data";
import Device from "@/component/app/smart/device";

export default function MainNav({ data, roomState }) {
  return (
    <UI.Col
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        bgcolor: "grey",
        height: "50vh",
        width: "100%",
        ...glass,
        borderRadius: "24px 24px 0 0 ",
      }}
      alignItems="center"
      width="100%"
    >
      <UI.Col
        sx={{
          t: 1,
          width: 48,
          bgcolor: "darkGrey",
          height: 4,
          margin: 0,
          borderRadius: "4px",
          position: "absolute",
          top: 12,
        }}
      />
      <UI.Col pt={0} flexGrow={1} overflow="auto">
        {data?.length ? (
          <UI.Col height="100%" pt={2}>
            <UI.Text p={1} variant="body1" color={"smart.text"}>
              {data?.length} Devices
            </UI.Text>
            <UI.Col
              overflow="auto"
              height="100%"
              sx={{
                pb: 5,
                "::-webkit-scrollbar": {
                  width: "0px",
                },
              }}
            >
              <RenderDevice data={data} roomState={roomState} />
            </UI.Col>
          </UI.Col>
        ) : (
          <UI.Text variant="body2" color="white">
            no device found in this room
          </UI.Text>
        )}
      </UI.Col>
    </UI.Col>
  );
}

function RenderDevice({ data, roomState }) {
  return (
    <UI.Row
      sx={{
        flexWrap: "wrap",
      }}
    >
      {data.map((d, ix) => (
        <UI.Col
          key={ix}
          sx={{
            width: { xs: "50%" },
          }}
        >
          {d.type == "switch" && <Device.Switch D={d} roomState={roomState} />}
        </UI.Col>
      ))}
    </UI.Row>
  );
}
