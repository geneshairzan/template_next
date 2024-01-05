import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";

import { Stack, Typography, ListItemButton } from "@mui/material";
import Datatables from "@gh/dataTables";
import StarsIcon from "@mui/icons-material/Stars";

import Context from "@context/app";
import { useRouter } from "next/router";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import { getInfo } from "@/model";
import { Menu, Fade } from "@mui/material";
import { TextField, MenuItem } from "@mui/material";
const status = ["pending", "active", "revoke"];

export default function App(props) {
  const router = useRouter();
  const model = "room";
  const { app, auth } = React.useContext(Context);
  const data = useFetch({ url: "family/room" });
  const [morestate, setmorestate] = useState();

  let col = [
    { name: "name", label: "Name", w: "auto" },
    // { name: "email", label: "Email", w: "280px", type: "elipsis" },
    // { name: "id", label: "Room Access", w: "auto" },
    // {
    //   name: "family_status",
    //   label: "Status",
    //   type: "el",
    //   El: (props) => <InputStatus onChange={handleChange} {...props} />,
    //   w: "200px",
    // },
  ];

  if (!data.get()) return;

  return (
    <Stack flexGrow={1} overflow="auto" spacing={2}>
      <UI.Stack flexGrow={1}>
        <Datatables
          name="model"
          data={data
            .get()
            ?.filter((d) => d?.id != auth?.user?.id)
            .map(getInfo(model, "datamap"))}
          col={col}
          NewElementConfig={{
            to: `config/room/create`,
            label: `New ${model}`,
          }}
          clickedMore={(id, e) =>
            setmorestate({
              id: id,
              open: true,
              anchorEl: e.currentTarget,
            })
          }
          rowChecker={true}
          options={{ rowEvenColor: "#ffffff", rowOddColor: "#ffffff" }}
          // clickedEdit={(id) => router.push(`/${router.query.model}/${id}`)}
        />
      </UI.Stack>
      {morestate?.open && (
        <MoreComponent
          morestate={morestate}
          setmorestate={setmorestate}
          model={model}
          modelinfo={getInfo(model)}
          // onDelete={handleDelete}
        />
      )}
    </Stack>
  );
}

function MoreComponent({ morestate, setmorestate, model, modelinfo, onDelete, ...props }) {
  const router = useRouter();

  return (
    <Menu
      anchorEl={morestate.anchorEl}
      open={morestate.open}
      onClose={() => setmorestate({})}
      TransitionComponent={Fade}
    >
      <UI.ListItemButton onClick={() => router.push(`config/room/${morestate.id}`)}>
        <MoreMenu label="Edit" Icon={Icon.Edit} />
      </UI.ListItemButton>

      {modelinfo?.list?.viewable && (
        <UI.ListItemButton>
          <MoreMenu label="Preview" Icon={Icon.View} />
        </UI.ListItemButton>
      )}

      {modelinfo?.list?.deleteable && (
        <UI.ListItemButton onClick={onDelete}>
          <MoreMenu label="Delete" Icon={Icon.Close} color="error" />
        </UI.ListItemButton>
      )}
    </Menu>
  );
}
function MoreMenu({ label, Icon, color }) {
  return (
    <UI.Row alignItems="center" spacing={1}>
      <Icon
        color={color}
        sx={{
          fontSize: 16,
        }}
      />
      <UI.Text variant="body2" bold>
        {label}
      </UI.Text>
    </UI.Row>
  );
}
