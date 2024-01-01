import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Bgimg from "@/component/app/smart/roomBg";
import ChairIcon from "@mui/icons-material/Chair";

import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";

export default function MainNav({ pages, activepage, setactivepage }) {
  return (
    <UI.Col sx={{ position: "absolute", bottom: "7dvh" }} center width="100%">
      <UI.Row
        sx={{
          position: "absolute",
          bgcolor: "smartSecondary.main",
          p: 1,
          borderRadius: "32px",
          width: { xs: "100%", md: "auto" },
          justifyContent: { xs: "space-between", md: "center" },
        }}
        spacing={2}
      >
        {pages?.map((d, ix) => (
          <RoomNavBtn key={ix} D={d} onClick={() => setactivepage(ix)} label={d.label} active={activepage == ix} />
        ))}
      </UI.Row>
    </UI.Col>
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
