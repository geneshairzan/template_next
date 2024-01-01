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

export default function MainNav({ data }) {
  const loc = useRouter();

  return (
    <UI.Row
      sx={{ position: "absolute", height: 48 }}
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      // bgcolor="red"
    >
      <UI.IconButton
        onClick={() => loc.push("/")}
        sx={{
          bgcolor: "grey",
        }}
      >
        <Icon.Back
          sx={{
            color: "white",
          }}
        />
      </UI.IconButton>
      <UI.Text variant="h5" bold>
        {data?.label}
      </UI.Text>
      <UI.IconButton
        sx={{
          bgcolor: "grey",
        }}
      >
        <MoreVertIcon
          sx={{
            color: "white",
          }}
        />
      </UI.IconButton>
    </UI.Row>
  );
}
