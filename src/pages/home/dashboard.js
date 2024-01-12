import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import MainNav from "@/component/app/smart/mainNav";
import MainHeader from "@/component/app/smart/mainHeader";
import MainGeneralInfo from "@/component/app/smart/mainGeneralInfo";
import RoomCards from "@/component/app/smart/roomCards";
import { pages } from "@/component/app/smart/data";
import useFetch from "@gh/helper/useFetch";
import Context from "@context/app";
import { useRouter } from "next/router";

export default function App({ forecast }) {
  const { auth } = React.useContext(Context);
  const rooms = useFetch({ url: "family/room" });
  const loc = useRouter();

  // const [access, setaccess] = useState();
  // useEffect(() => {
  //   // auth?.user && setaccess(auth?.user?.room_access.map((d) => d.id));
  // }, [auth]);

  function accessFilter(d) {
    if (d.access_id == 2) return true;
    if (auth.user.role_id == 2) return true;
    if (d.access_id == 1 && d.owner_id == auth.user.id) return true;
    return false;
  }

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
      <MainGeneralInfo forecast={forecast} />
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
          ?.filter(accessFilter)
          .map((d, ix) => (
            <RoomCards D={d} key={ix} />
          ))}
        {auth?.user?.role_id == 2 && (
          <UI.Row spacing={2}>
            <UI.Col sx={{ ...conStyle }} onClick={() => loc.push("/home/master/device")}>
              <UI.Text variant="h2" sx={{ p: 2, zIndex: 2 }}>
                ALL <br />
                DEVICE
              </UI.Text>
              <img src="/assets/img/bg/all-device.jpg" alt="" style={imgStyle} />
            </UI.Col>
            <UI.Col sx={conStyle}>
              <UI.Text variant="h2" sx={{ p: 2, zIndex: 2 }}>
                ALL <br /> CAMERA
              </UI.Text>
              <img src="/assets/img/bg/all-camera.jpg" alt="" style={imgStyle} />
            </UI.Col>
          </UI.Row>
        )}
      </UI.Col>
    </UI.Col>
  );
}

const conStyle = {
  width: "100%",
  height: "225px",
  // bgcolor: "smart.main",
  borderRadius: 3,
  position: "relative",
  overflow: "hidden",
  zIndex: 2,
  justifyContent: "flex-end",
};
const imgStyle = {
  objectFit: "cover",
  objectPosition: "100% 50%",
  width: "100%",
  height: "100%",
  position: "absolute",
  right: 0,
  zIndex: 0,
  opacity: 0.6,
};
