import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Icon from "@gh/icon";
import Bgimg from "@/component/app/smart/roomBg";
import ChairIcon from "@mui/icons-material/Chair";

import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/router";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { glass } from "@/component/app/smart/data";
import Device from "@/component/app/smart/device";
import useFetch, { fetcher } from "@gh/helper/useFetch";

export default function MainNav({ data, roomState }) {
  const [onloading, setonloading] = useState();
  const data_ha = useFetch({
    url: "family/device/sync",
  });

  useEffect(() => {
    setonloading();
  }, [data_ha?.get()]);

  function syncMap(d) {
    return {
      ...d,
      state: data_ha.get()?.find((dx) => dx?.entity_id == d?.ha_entity_id)?.state,
    };
  }

  async function deviceToggle(e) {
    setonloading(e);
    let res = await fetcher({
      url: "device",
      method: "post",
      data: {
        id: e,
        do: "toggle",
      },
    });
    if (res?.data) data_ha.reload();
  }

  async function handleClick(device) {
    await deviceToggle(device?.ha_entity_id);
  }

  return (
    <UI.Col
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        bgcolor: "grey",
        height: { xs: "50vh", md: "100%" },
        width: "100%",
        ...glass,
        borderRadius: { xs: "24px 24px 0 0 ", md: 0 },
      }}
      alignItems="center"
      width="100%"
    >
      <UI.Col
        sx={{
          display: { xs: "flex", md: "none" },
          t: 1,
          width: 48,
          bgcolor: "darkGrey",
          height: 4,
          margin: 0,
          borderRadius: "4px",
          position: "absolute",
          top: 12,
        }}
      />
      <UI.Col
        pt={0}
        flexGrow={1}
        overflow="auto"
        center
        sx={{
          width: "100%",
          px: { xs: 0, md: "15vw" },
        }}
      >
        {data?.length ? (
          <UI.Col
            pt={2}
            sx={{
              width: "100%",
              minHeight: {
                xs: "100%",
                md: "0",
              },
              maxHeight: {
                xs: "100%",
                md: "60dvh",
              },
            }}
          >
            <UI.Text p={1} variant="body1" color={"smart.text"}>
              {data?.length} Devices
            </UI.Text>
            <UI.Col
              overflow="auto"
              height="100%"
              sx={{
                pb: 5,
                "::-webkit-scrollbar": {
                  width: "0px",
                },
              }}
            >
              <RenderDevice
                data={data.map(syncMap)}
                roomState={roomState}
                onClick={handleClick}
                onloading={onloading}
              />
            </UI.Col>
          </UI.Col>
        ) : (
          <UI.Text variant="body2" color="white">
            no device found in this room
          </UI.Text>
        )}
      </UI.Col>
    </UI.Col>
  );
}

function RenderDevice({ data, roomState, onClick, onloading }) {
  return (
    <UI.Row
      sx={{
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      {data.map((d, ix) => (
        <UI.Col
          key={ix}
          sx={{
            width: { xs: "50%", md: "25%" },
          }}
        >
          {d.type_id == 1 && (
            <Device.Switch
              D={d}
              roomState={roomState}
              onClick={() => !onloading && onClick(d)}
              onloading={onloading == d?.ha_entity_id}
            />
          )}
        </UI.Col>
      ))}
    </UI.Row>
  );
}
