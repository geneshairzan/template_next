import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import MainNav from "@/component/app/smart/mainNav";
import MainHeader from "@/component/app/smart/mainHeader";
import MainGeneralInfo from "@/component/app/smart/mainGeneralInfo";
import RoomCards from "@/component/app/smart/roomCards";
import { rooms, pages } from "@/component/app/smart/data";

export default function App(props) {
  const [activepage, setactivepage] = useState(0);
  return (
    <UI.Col width="100%" maxWidth={1920} maxHeight={1080} height="100%" position="relative" py={{ xs: 2, md: 5 }}>
      <MainHeader />
      <UI.Col
        id="mainContainer"
        sx={{
          pt: "calc(48px + 16px)",
        }}
        spacing={2}
        flexGrow={1}
      >
        <MainGeneralInfo />
        <UI.Col
          height="10vh"
          spacing={2}
          sx={{
            pb: "64px",
            flexGrow: 1,
            overflow: "auto",
            "::-webkit-scrollbar": {
              width: "0px",
            },
          }}
        >
          {rooms.map((d) => (
            <RoomCards D={d} />
          ))}
        </UI.Col>
      </UI.Col>
      <MainNav pages={pages} activepage={activepage} setactivepage={setactivepage} />
    </UI.Col>
  );
}
