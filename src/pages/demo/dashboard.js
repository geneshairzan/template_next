import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import MainNav from "@/component/app/smart/mainNav";
import MainHeader from "@/component/app/smart/mainHeader";
import MainGeneralInfo from "@/component/app/smart/mainGeneralInfo";
import RoomCards from "@/component/app/smart/roomCards";
import { rooms, pages } from "@/component/app/smart/data";

export default function App(props) {
  return (
    <UI.Col flexGrow={1}>
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
    </UI.Col>
  );
}
