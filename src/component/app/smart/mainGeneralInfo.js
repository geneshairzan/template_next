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
    <UI.Stack
      direction={{ xs: "row", md: "column" }}
      sx={{
        p: { xs: 1, md: 3 },
        width: { xs: "100%", md: "40%" },
        height: { xs: "auto", md: "calc(100% - 36px)" },
        bgcolor: "smartSecondary.main",
        borderRadius: 3,
      }}
      spacing={1}
    >
      <UI.Col
        border="1px solid black"
        bgcolor="smart.dark"
        borderRadius={3}
        sx={{
          width: { xs: "60%", md: "100%" },
          overflow: "hidden",
        }}
      >
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
      <UI.Col
        spacing={1}
        direction={{ xs: "column", md: "row" }}
        sx={{
          width: { xs: "40%", md: "100%" },
        }}
      >
        {info.map((d, ix) => (
          <InfoCard D={d} key={ix} />
        ))}
      </UI.Col>
    </UI.Stack>
  );
}

function InfoCard({ D }) {
  return (
    <UI.Col
      sx={{
        bgcolor: "smart.dark",
        height: { xs: "30%", md: 140 },
        width: { xs: "100%", md: "40%" },
        borderRadius: 3,
        p: 1,
        alignItems: { xs: "flex-start", md: "center" },
      }}
    >
      <D.Icon
        color="smart"
        sx={{
          display: { xs: "none", md: "flex" },
          fontSize: { xs: 18, md: 64 },
        }}
      />
      <UI.Text
        color="smart.textdark"
        sx={{
          typography: { xs: "body2", md: "h5" },
          textAlign: { xs: "left", md: "center" },
        }}
      >
        {D.name}
      </UI.Text>
      <UI.Row
        spacing={1}
        alignItems="center"
        sx={{
          justifyContent: { xs: "flex-start", md: "center" },
        }}
      >
        <D.Icon
          color="smart"
          sx={{
            display: { xs: "flex", md: "none" },
            fontSize: { xs: 18, md: 64 },
          }}
        />
        <UI.Text
          color="smart.text"
          sx={{
            typography: { xs: "body1", md: "h5" },
          }}
        >
          {D.value}
        </UI.Text>
      </UI.Row>
    </UI.Col>
  );
}
