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

import AirIcon from "@mui/icons-material/Air";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import GrainIcon from "@mui/icons-material/Grain";

const info = [
  {
    name: "Force",
    value: "12 km/h",
    Icon: AirIcon,
  },
  {
    name: "Humidity",
    value: "42 %",
    Icon: GrainIcon,
  },
  {
    name: "Change of rain",
    value: "42 %",
    Icon: BloodtypeIcon,
  },
];

export default function MainNav({ pages, activepage, setactivepage }) {
  return (
    <UI.Row
      width="100%"
      p={1}
      sx={{
        bgcolor: "smartSecondary.main",
        borderRadius: 3,
      }}
      spacing={1}
    >
      <UI.Col width="60%" border="1px solid black" bgcolor="smart.dark" borderRadius={3}>
        <UI.Col p={{ xs: 2, md: 5 }} spacing={2}>
          <UI.Row justifyContent="space-between" position="relative">
            <UI.Text color={"smart.main"} variant="h4">
              82.4°F
            </UI.Text>
            <UI.Col
              sx={{
                position: "absolute",
                width: "40%",
                right: 0,
              }}
            >
              <img src="/assets/img/weather/normal.svg" alt="" style={{ objectFit: "contain", width: "100%" }} />
            </UI.Col>
          </UI.Row>
          <UI.Col>
            <UI.Text variant="h6" color={"smart.text"}>
              Sunny
            </UI.Text>
            <UI.Text variant="body2" color={"smart.textdark"}>
              Keep your face always toward the sunshine.
            </UI.Text>
          </UI.Col>
          <UI.Text variant="h6" color={"smart.text"}>
            Jakarta, Indonesia
          </UI.Text>
        </UI.Col>
      </UI.Col>
      <UI.Col width="40%" spacing={1}>
        {info.map((d, ix) => (
          <InfoCard D={d} key={ix} />
        ))}
      </UI.Col>
    </UI.Row>
  );
}

function InfoCard({ D }) {
  return (
    <UI.Col
      sx={{
        bgcolor: "smart.dark",
        height: "30%",
        borderRadius: 3,
        p: 1,
      }}
    >
      <UI.Text variant="body2" color="smart.textdark">
        {D.name}
      </UI.Text>
      <UI.Row spacing={1}>
        <D.Icon color="smart" />
        <UI.Text variant="body1" color="smart.text">
          {D.value}
        </UI.Text>
      </UI.Row>
    </UI.Col>
  );
}
