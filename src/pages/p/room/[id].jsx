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
  const [data, setdata] = useState(rooms.find((d) => d.id == query?.id));
  if (!query?.id) return;

  return (
    <UI.Col width="100%" maxWidth={1920} maxHeight={1080} height="100%" position="relative" py={{ xs: 2, md: 5 }}>
      <RoomBg src={data?.src} />
      <RoomHeader data={data} />
      <Devices d={data.devices} />
      <MasterSlide />
    </UI.Col>
  );
}
