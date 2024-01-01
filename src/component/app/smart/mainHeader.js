import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Bgimg from "@/component/app/smart/roomBg";
import ChairIcon from "@mui/icons-material/Chair";

import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
export default function MainNav({ pages, activepage, setactivepage }) {
  return (
    <UI.Row
      sx={{ position: "absolute", height: 48 }}
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      // bgcolor="red"
    >
      <Avatar sx={{ bgcolor: "smart.main" }}>S</Avatar>
      <UI.Text variant="h4" bold sx={{ color: "white" }}>
        Smart's Home
      </UI.Text>
      <UI.IconButton>
        <Badge badgeContent={4} color="error">
          <NotificationsIcon color="smart" />
        </Badge>
      </UI.IconButton>
    </UI.Row>
  );
}

function RoomNavBtn({ D, active, onClick }) {
  return (
    <UI.Row
      onClick={onClick}
      sx={{
        spacing: 1,
        py: 2,
        px: active ? 5 : 0,
        width: active ? "auto" : 48,
        height: 48,
        borderRadius: "30px",
        bgcolor: active ? "menu.active" : "menu.inactive",
        color: !active ? "menu.active" : "menu.inactive",
        fontWeight: "bold",
      }}
      center
    >
      {active ? D.label : <D.Icon />}
    </UI.Row>
  );
}
