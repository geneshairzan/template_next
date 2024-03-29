import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import MainNav from "@/component/app/smart/mainNav";
import MainHeader from "@/component/app/smart/mainHeader";
import MainGeneralInfo from "@/component/app/smart/mainGeneralInfo";
import RoomCards from "@/component/app/smart/roomCards";
import { rooms, pages } from "@/component/app/smart/data";
import useFetch, { fetcher } from "@gh/helper/useFetch";

import Dashboard from "./dashboard";
import Notes from "./notes";
import Media from "./media";
import Scheduler from "./scheduler";
import Video from "./video";
import axios from "axios";

export default function App(props) {
  // const room = useFetch({ url: "family/room" });
  const log = useFetch({ url: "log" });
  const notes = useFetch({ url: "family/notes" });

  useEffect(() => {
    const interval = setInterval(() => {
      // log.reload();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  //https://www.weatherapi.com/api-explorer.aspx
  const forecast = useFetch({
    url: "https://api.weatherapi.com/v1/forecast.json?key=4aa52ce0c3d54ac8b7d132258240701&q=jakarta&days=1&aqi=no&alerts=no",
  });

  const [activepage, setactivepage] = useState(0);
  return (
    <UI.Col px={{ xs: 2, md: 5 }} width="100%">
      <UI.Col
        width="100%"
        maxWidth={1920}
        maxHeight={1080}
        height="100dvh"
        position="relative"
        py={{ xs: 2, md: 6 }}
        // overflow="hidden"
      >
        <MainHeader log={log} />
        <UI.Col
          flexGrow={1}
          id="mainContainer"
          sx={{
            pt: { xs: 0, md: "calc(48px + 16px)" },
            position: "relative",
            height: { xs: "100%", md: "100%" },
          }}
        >
          {activepage == 0 && <Dashboard forecast={forecast.get()} cctv={props?.cctv} />}
          {activepage == 1 && <Notes notes={notes} />}
          {activepage == 2 && <Media />}
          {activepage == 3 && <Scheduler />}
        </UI.Col>
        <MainNav pages={pages} activepage={activepage} setactivepage={setactivepage} />
      </UI.Col>
    </UI.Col>
  );
}
