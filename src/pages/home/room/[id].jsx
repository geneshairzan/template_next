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

export default function ModelForm(props) {
  const { query } = useRouter();
  if (!query?.id) return;
  // const [data, setdata] = useState(rooms.find((d) => d.id == query?.id));
  const [roomState, setroomState] = useState();
  const rooms = useFetch({ url: `family/room/${query?.id}` });

  async function handleRoomChange(data) {
    setroomState(data);
    await rooms.dfetch({
      url: `family/room/${query?.id}`,
      method: "post",
      reload: true,
      data: {
        state: data?.state ? 1 : 0,
        state_value: data?.state_value,
      },
    });
  }

  useEffect(() => {
    setroomState({ state: rooms?.get()?.state, state_value: rooms?.get()?.state_value || 0 });
  }, [rooms?.get()]);

  return (
    <UI.Col
      maxWidth={1920}
      maxHeight={1080}
      height="100dvh"
      position="relative"
      p={{ xs: 2, md: 5 }}
      sx={{
        width: "100vw",
      }}
    >
      <RoomBg src={"room/" + rooms.get()?.img} />
      <RoomHeader data={rooms.get()} />
      <Devices data={rooms.get()?.device} roomState={roomState} refetch={() => rooms.reload()} />
      {rooms?.get() && <MasterSlide onRoomChange={handleRoomChange} data={roomState} />}
    </UI.Col>
  );
}
