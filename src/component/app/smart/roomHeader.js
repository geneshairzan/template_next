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
  const loc = useRouter();

  return (
    <UI.Row sx={{ position: "absolute", height: 48 }} width="100%" justifyContent="space-between" alignItems="center">
      <UI.Button
        startIcon={<Icon.Back />}
        onClick={() => loc.push("/")}
        alignItems="center"
        spacing={0}
        bgcolor="grey"
        sx={{
          borderRadius: 32,
          pr: 2,
          textTransform: "none",
          ...glass,
        }}
      >
        {data?.label}

        <UI.Text variant="h6" color="white"></UI.Text>
      </UI.Button>
      <UI.IconButton
        sx={{
          bgcolor: "grey",
          ...glass,
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
