import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import MainNav from "@/component/app/smart/mainNav";
import MainHeader from "@/component/app/smart/mainHeader";
import MainGeneralInfo from "@/component/app/smart/mainGeneralInfo";
import RoomCards from "@/component/app/smart/roomCards";
import { pages } from "@/component/app/smart/data";
import useFetch from "@gh/helper/useFetch";
import Context from "@context/app";

export default function App(props) {
  const { auth } = React.useContext(Context);
  const rooms = useFetch({ url: "family/room" });

  const [access, setaccess] = useState();

  useEffect(() => {
    auth?.user && setaccess(auth?.user?.room_access.map((d) => d.id));
  }, [auth]);

  return (
    <UI.Col
      flexGrow={1}
      direction={{ xs: "column", md: "row" }}
      id="mainContainer"
      sx={{
        pt: "calc(48px + 16px)",
        position: "relative",
        height: { xs: "100%", md: "100%" },
      }}
      spacing={2}
    >
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
        {rooms
          ?.get()
          ?.filter((d) => access?.includes(d.id))
          .map((d, ix) => (
            <RoomCards D={d} key={ix} />
          ))}
      </UI.Col>
    </UI.Col>
  );
}
