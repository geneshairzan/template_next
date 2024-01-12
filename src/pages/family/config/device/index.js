import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Form from "@gh/form";
import Icon from "@gh/icon";
import InputEditable from "@gh/form/inputEditable";

import { Stack, TextField, MenuItem } from "@mui/material";
import Datatables from "@gh/dataTables";

import Context from "@context/app";
import { useRouter } from "next/router";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import { getInfo } from "@/model";
import { Menu, Fade } from "@mui/material";

export default function App(props) {
  const router = useRouter();
  const model = "device";
  const { app, auth } = React.useContext(Context);
  const status = useFetch({
    url: "status",
  });

  const data = useFetch({
    url: "family/device",
  });

  const data_ha = useFetch({
    url: "family/device/sync",
  });
  const rooms = useFetch({
    url: "family/room",
  });

  const [morestate, setmorestate] = useState();

  let col = [
    { name: "ha_entity_id", label: "id", w: "220px", freeze: false },
    {
      name: "name",
      label: "Name",
      w: "auto",
      type: "el",
      El: (props) => <InputEditable onChange={handleName} {...props} />,
    },
    {
      name: "access_id",
      label: "Access",
      w: 220,
      type: "el",
      El: (props) => <Form.Access onChange={(e) => handleAccess(e?.target?.value, props?.row)} name {...props} />,
      w: "200px",
    },
    {
      name: "room_id",
      label: "Room",
      w: 220,
      type: "el",
      El: (props) => <InputRoom onChange={handleRoom} options={rooms?.get()} {...props} />,
      w: "200px",
    },

    {
      name: "status_id",
      label: "Status",
      w: 220,
      type: "el",
      El: (props) => (
        <Form.Status onChange={(e) => handleStatus(e?.target?.value, props?.row)} options={status.get()} {...props} />
      ),
      w: "200px",
    },
    { name: "state", label: "state", w: "120px", type: "elipsis" },
    {
      name: "ha_entity_id",
      label: "Test",
      w: "120px",
      type: "el",
      El: (props) => <TSwitch onClick={handleTest} {...props} />,
    },
  ];

  function syncMap(d) {
    return {
      ...d,
      state: data_ha.get()?.find((dx) => dx?.entity_id == d?.ha_entity_id)?.state,
    };
  }

  async function handlePull() {
    let res = await fetcher({
      url: "family/device/pull",
      method: "post",
    });
    if (res?.data) data?.reload();
  }

  async function doUpdate(payload) {
    let res = await fetcher({
      url: "family/device",
      method: "post",
      data: payload,
    });
    if (res?.data) data?.reload();
  }

  async function handleTest(e) {
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

  async function handleRoom(rid, device) {
    doUpdate({
      id: device?.id,
      room_id: rid,
    });
  }

  async function handleAccess(rid, device) {
    doUpdate({
      id: device?.id,
      access_id: rid,
    });
  }

  async function handleStatus(rid, device) {
    doUpdate({
      id: device?.id,
      status_id: rid,
    });
  }

  async function handleName(localname, device) {
    doUpdate({
      id: device?.id,
      name: localname,
    });
  }

  if (!data_ha.get()?.length) return <UI.Loader />;

  return (
    <Stack flexGrow={1} overflow="auto" spacing={2}>
      <Datatables
        name="model"
        data={data
          .get()
          ?.filter((d) => d?.id != auth?.user?.id)
          .map(syncMap)}
        col={col}
        // NewElementConfig={{
        //   to: `config/member/create`,
        //   label: `New ${model}`,
        // }}
        NewElement={false}
        extraEl={
          <UI.Button onClick={handlePull} sx={{ borderRadius: "100px" }}>
            Sync Devices
          </UI.Button>
        }
        // clickedMore={(id, e) =>
        //   setmorestate({
        //     id: id,
        //     open: true,
        //     anchorEl: e.currentTarget,
        //   })
        // }
        rowChecker={true}
        options={{ rowEvenColor: "#ffffff", rowOddColor: "#ffffff" }}
        // clickedEdit={(id) => router.push(`/${router.query.model}/${id}`)}
      />
    </Stack>
  );
}

function InputRoom({ value, onChange, disabled, row, options, ...props }) {
  if (!options?.length) return <UI.Loader />;

  return (
    <TextField
      fullWidth
      value={value || -1}
      onChange={(e) => onChange(e.target.value, row)}
      select
      disabled={disabled}
      {...props}
    >
      <MenuItem value={null}>-</MenuItem>
      {options.map((d, ix) => (
        <MenuItem key={ix} value={d.id}>
          {d.name}
        </MenuItem>
      ))}
    </TextField>
  );
}

function TSwitch({ value, onClick, ...props }) {
  return (
    <UI.Button onClick={() => onClick(value)} {...props}>
      test
    </UI.Button>
  );
}
