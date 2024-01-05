import React, { useState, useEffect } from "react";

import Form from "@gh/form";

import UI from "@gh/ui";
import { useRouter } from "next/router";
import useFetch from "@gh/helper/useFetch";
import { rooms } from "@/component/app/smart/data";
import RoomBg from "@/component/app/smart/roomBg";
import RoomHeader from "@/component/app/smart/roomHeader";
import Devices from "@/component/app/smart/roomDevices";
import MasterSlide from "@/component/app/smart/roomMasterSlide";
// import { rooms, pages } from "@/component/app/smart/data";

export default function ModelForm(props) {
  const { query } = useRouter();
  const [data, setdata] = useState(rooms.find((d) => d.id == query?.id));
  const [roomState, setroomState] = useState();
  if (!query?.id) return;

  return (
    <UI.Col width="100%" maxWidth={1920} maxHeight={1080} height="100%" position="relative" py={{ xs: 2, md: 5 }}>
      <RoomBg src={"room/" + data?.img} />
      <RoomHeader data={data} />
      <Devices data={data.devices} roomState={roomState} />
      <MasterSlide onRoomChange={setroomState} />
    </UI.Col>
  );
}
