import UI from "@gh/ui";
import Form from "@gh/form";
import Context from "@context";
import React, { useState } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useFetch, { fetcher } from "@gh/helper/useFetch";

export default function App(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [onChangePassword, setonChangePassword] = useState(false);
  const { auth, app } = React.useContext(Context);
  return (
    <>
      {onChangePassword && <NewPassword onClose={() => setonChangePassword()} />}
      <UI.Row spaced>
        <UI.Row alignItems="center" gap={1} px={2}>
          <UI.Icon name="account_circle" size={32} color="primary.main" />
          <UI.Col>
            <UI.Text variant="h6" bold>
              {auth.user?.name}
            </UI.Text>
            <UI.Text variant="body2">{auth.user?.companies?.find((d) => d.company.id == app.company.id)?.role.name}</UI.Text>
          </UI.Col>

          {/* <UI.Icon name="account_circle" size={48} /> */}
        </UI.Row>
        <UI.IconButton name="more_vert" onClick={(e) => setAnchorEl(e.currentTarget)} />
      </UI.Row>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl()}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            setonChangePassword(true);
            setAnchorEl();
          }}
        >
          Change Password
        </MenuItem>
        <MenuItem
          onClick={() => {
            auth.signout();
            app.setApp({});
          }}
        >
          Sign out
        </MenuItem>
      </Menu>
    </>
  );
}

function NewPassword({ onClose }) {
  const [form, setform] = useState({ pwd: "", repwd: "" });
  const { auth } = React.useContext(Context);
  const [complete, setcomplete] = useState(false);

  async function handleSubmit(params) {
    let res = await fetcher({
      url: "super/user",
      method: "post",
      data: {
        id: auth.user?.id,
        new_password: form.pwd,
      },
    });
    auth.check();
    res.data && setcomplete(true);
  }

  function isValid() {
    if (form.pwd.length < 8 || form.repwd != form.pwd) return false;
    return true;
  }

  return (
    <UI.Modal open>
      <UI.Col
        sx={{
          bgcolor: "white",
          minWidth: 600,
          p: 2,
          gap: 2,
        }}
      >
        <UI.Row spaced>
          <UI.Text variant="h5" bold color="primary">
            Set New password
          </UI.Text>
          <UI.IconButton name="close" onClick={onClose} />
        </UI.Row>
        <Form.Text type="password" label="password" value={form.pwd} onChange={(e) => setform({ ...form, pwd: e.target.value })} />
        <Form.Text type="password" label="re enter password" value={form.repwd} onChange={(e) => setform({ ...form, repwd: e.target.value })} />

        {!complete && (
          <UI.Col gap={1}>
            <UI.Text variant="body1" color="grey">
              * Password mininal 8 character
            </UI.Text>
            <UI.Button disabled={!isValid()} onClick={handleSubmit}>
              Save
            </UI.Button>
          </UI.Col>
        )}
        {complete && (
          <UI.Col gap={1}>
            <UI.Text variant="body1" color="success">
              Password Changed !
            </UI.Text>
            <UI.Button onClick={onClose}>Close</UI.Button>
          </UI.Col>
        )}
      </UI.Col>
    </UI.Modal>
  );
}
