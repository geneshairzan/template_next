import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import MainNav from "@/component/app/smart/mainNav";
import MainHeader from "@/component/app/smart/mainHeader";
import MainGeneralInfo from "@/component/app/smart/mainGeneralInfo";
import RoomCards from "@/component/app/smart/roomCards";
import { rooms, pages } from "@/component/app/smart/data";

import Dashboard from "./dashboard";

export default function App(props) {
  const [activepage, setactivepage] = useState(0);
  return (
    <UI.Col
      width="100%"
      maxWidth={1920}
      maxHeight={1080}
      height="100%"
      position="relative"
      py={{ xs: 2, md: 6 }}
      // overflow="hidden"
    >
      <MainHeader />
      <UI.Stack
        id="mainContainer"
        direction={{ xs: "column", md: "row" }}
        sx={{
          pt: "calc(48px + 16px)",
          position: "relative",
          height: { xs: "100%", md: "100%" },
        }}
        spacing={2}
        flexGrow={1}
      >
        {/* {activepage == 0 && <Dashboard />} */}
        <MainGeneralInfo />
        <UI.Col
          spacing={2}
          sx={{
            height: { xs: "10vh", md: "calc(100% - 36px)" },
            maxHeight: "100%",
            pb: "64px",
            flexGrow: 1,
            overflow: "scroll",
            "::-webkit-scrollbar": {
              width: "0px",
              height: 0,
            },
          }}
        >
          {rooms.map((d, ix) => (
            <RoomCards D={d} key={ix} />
          ))}
        </UI.Col>
      </UI.Stack>
      <MainNav pages={pages} activepage={activepage} setactivepage={setactivepage} />
    </UI.Col>
  );
}
