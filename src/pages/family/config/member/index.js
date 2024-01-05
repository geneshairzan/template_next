import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";

import { Stack, Autocomplete, Typography } from "@mui/material";
import Datatables from "@gh/dataTables";
import StarsIcon from "@mui/icons-material/Stars";

import Context from "@context/app";
import { useRouter } from "next/router";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import { getInfo } from "@/model";
import { Menu, Fade } from "@mui/material";
import { TextField, MenuItem, Checkbox } from "@mui/material";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function App(props) {
  const router = useRouter();
  const model = "member";
  const { app, auth } = React.useContext(Context);
  const data = useFetch({ url: "family/member" });
  const rooms = useFetch({
    url: "family/room",
  });
  const [morestate, setmorestate] = useState();

  let col = [
    { name: "name", label: "Name", w: "200px" },
    { name: "email", label: "Email", w: "280px", type: "elipsis" },
    {
      name: "room_access",
      label: "Room Access",
      w: "auto",
      type: "el",
      El: (props) => <InputRoom option={rooms.get() || []} onChange={handleRoom} {...props} />,
    },
    {
      name: "family_status",
      label: "Status",
      type: "el",
      El: (props) => <InputStatus onChange={handleStatus} {...props} />,
      w: "200px",
    },
  ];

  async function handleRoom(v, row) {
    let res = await data.fetch({
      url: "family/member",
      method: "post",
      data: {
        id: row?.id,
        room_access: v.map((d) => ({ id: d.id, name: d.name })),
      },
    });
    data.reload();
  }

  async function handleStatus(e, row) {
    let res = await data.fetch({
      url: "family/member",
      method: "post",
      data: {
        id: row?.id,
        family_status: e.target.value,
      },
    });
    res?.id && data.reload();
    // console.log(e);
  }

  if (!data.get()) return;

  return (
    <Stack flexGrow={1} overflow="auto" spacing={2}>
      <UI.Stack flexGrow={1}>
        {/* <UI.Text variant="h4" color="smart.main">
          Family List
        </UI.Text> */}
        <Datatables
          name="model"
          data={data
            .get()
            ?.filter((d) => d?.id != auth?.user?.id)
            .map(getInfo(model, "datamap"))}
          col={col}
          NewElementConfig={{
            to: `config/member/create`,
            label: `New ${model}`,
          }}
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
      </UI.Stack>
    </Stack>
  );
}

function InputStatus({ value, onChange, disabled, row, ...props }) {
  const status = ["pending", "active", "revoke"];
  return (
    <TextField fullWidth value={value} onChange={(e) => onChange(e, row)} select disabled={disabled} {...props}>
      {status.map((d, ix) => (
        <MenuItem key={ix} value={ix}>
          {d}
        </MenuItem>
      ))}
    </TextField>
  );
}

function InputRoom({ value, onChange, disabled, row, option, ...props }) {
  return (
    <Autocomplete
      multiple
      fullWidth
      options={option}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <UI.Row
          {...props}
          mx={-1.5}
          sx={{
            p: 0,
            height: 32,
          }}
        >
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          {option.name}
        </UI.Row>
      )}
      renderTags={(value, getTagProps) => {
        return (
          <UI.Text variant="body2" pl={1}>
            {value.map((d) => d.name).join(", ")}
          </UI.Text>
        );
      }}
      value={value || []}
      renderInput={(params) => <TextField {...params} />}
      onChange={(e, v) => onChange(v, row)}
      isOptionEqualToValue={(option, value) => option.id == value.id}
    />
  );
}
