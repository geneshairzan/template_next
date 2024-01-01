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

export default function MainNav({ data }) {
  return (
    <UI.Col
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        bgcolor: "grey",
        height: "50vh",
        width: "100%",
        p: 2,
        ...glass,
        borderRadius: "24px 24px 0 0 ",
      }}
      alignItems="center"
      width="100%"
    >
      <UI.Col
        sx={{
          width: 48,
          bgcolor: "darkGrey",
          height: 4,
          margin: 0,
          borderRadius: "4px",
        }}
      />
      <UI.Col pt={2} center flexGrow={1}>
        {data?.devices?.length ? (
          <RenderDevice data={data?.devices} />
        ) : (
          <UI.Text variant="body2" color="white">
            no device found in this room
          </UI.Text>
        )}
      </UI.Col>
    </UI.Col>
  );
}

function RenderDevice(params) {
  return <UI.Col pt={2}>device 1</UI.Col>;
}
