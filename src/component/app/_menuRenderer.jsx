import React, { useEffect, useState } from "react";

import UI from "@gh/ui";
import Context from "@context/app";
import { Stack, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { nav, adminNav, menuGenerator } from "./_nav";

import Link from "next/link";
import { useRouter } from "next/router";

import Icon from "@gh/icon";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
// import imglogout from "@img/dashboard/logout.svg";
import SpaIcon from "@mui/icons-material/Spa";

export default function DesktopMenu({ onClick }) {
  const { app, auth } = React.useContext(Context);
  const loc = useRouter();
  const [onOpen, setonOpen] = useState();
  const [dynnav, setdynnav] = useState([]);

  useEffect(() => {
    getModel();
  }, []);

  async function getModel() {
    // let res = await app.fetch({
    //   url: `schema/model`,
    //   method: "get",
    // });
    // let temp = res?.map((d) => menuGenerator(d.name));
    // setdynnav(temp);
  }

  return (
    <UI.Col justifyContent="space-between" height="100%" mt={3}>
      <UI.Col>
        {!loc.pathname.includes("admin") && (
          <>
            <RowMenuItem path="/status" label="Status" onClick={onClick} />
            <RowMenuItem path="/productcategory" label="Product Category" onClick={onClick} />
            <RowMenuItem path="/product" label="Product" onClick={onClick} />
          </>
        )}

        {loc.pathname.includes("admin") && (
          <UI.Col spacing={{ xs: 0, md: 1 }}>
            <UI.Col px={2} pb={2}>
              <UI.Button startIcon={<Icon.Plus />} LinkComponent={Link} href="admin/update" onClick={onClick}>
                Add Plant Update
              </UI.Button>
            </UI.Col>
            {auth?.user?.role == 3 &&
              adminNav
                ?.filter((v) => rolefilter(v, auth))
                .map((d, ix) => (
                  <UI.Col spacing={0} key={ix}>
                    {d.path ? (
                      <RowMenuItem path={d?.path} label={d?.name} onClick={onClick} icon={<Icon.Home></Icon.Home>} />
                    ) : (
                      <UI.Text variant="body1" bold color="primary.dark" pt={2} px={2}>
                        {d.name}
                      </UI.Text>
                    )}

                    {d?.child?.map((dx, ix) => (
                      <RowMenuItem key={ix} path={dx?.path} label={dx?.name} onClick={onClick} newTab={dx?.newTab} />
                    ))}
                  </UI.Col>
                ))}
          </UI.Col>
        )}
        {dynnav
          ?.filter((v) => rolefilter(v, auth))
          .map((d, ix) => (
            <React.Fragment key={ix}>
              {!d?.child && <RenderSingleMenu d={d} />}
              {d?.child && <RenderMultiMenu d={d} onClick={setonOpen} open={onOpen == ix} ix={ix} />}
            </React.Fragment>
          ))}
      </UI.Col>
      <UI.Col>
        <RowMenuItem path="/about" label="About Us" onClick={onClick} mt={2} />
        <RowMenuItem path="/tnc" label="Terms & Condition" onClick={onClick} />
        <RowMenuItem path="/privacypolicy" label="Privacy & Policy" onClick={onClick} />
        <RowMenuItem
          sx={{ mt: 1 }}
          label="Logout"
          icon={<Icon.Logout />}
          onClick={() => {
            auth.signout();
            onClick();
          }}
        />
      </UI.Col>
    </UI.Col>
  );
}

function RenderMultiMenu({ d, ...props }) {
  return (
    <>
      <UI.Text variant="body1" bold color="primary.dark" pt={2}>
        {d.name}
      </UI.Text>
      {/* <RenderSingleMenu d={d} asButton onClick={props.onClick} open={props.open} ix={props.ix} /> */}
      <Collapse
        // in={props.open}
        in={true}
        timeout="auto"
        unmountOnExit
      >
        <UI.Col spacing={2}>
          {d.child.filter(rolefilter).map((dx, dix) => (
            <>
              <RenderSingleMenu d={dx} key={dix} />
            </>
          ))}
        </UI.Col>
      </Collapse>
    </>
  );
}

function RenderSingleMenu({ d, asButton = false, ...props }) {
  return (
    <UI.Row
      alignItems="center"
      spacing={2}
      component={!asButton ? Link : "div"}
      href={!asButton ? d.path : "#"}
      onClick={() => asButton && props.onClick(!props.open ? props.ix : null)}
      sx={{
        p: {
          color: "#464649",
          "&:hover": d.path && {
            color: "#e20547",
          },
        },
      }}
    >
      {d?.icon && (
        <d.icon
          sx={{
            fontSize: 16,
          }}
        />
      )}
      <UI.Text variant="menu" bold={!Boolean(d.path)}>
        {d.name}
      </UI.Text>
    </UI.Row>
  );
}

function rolefilter(d, auth) {
  if (d?.role) {
    if (auth?.user?.role_id == 2) {
      if (d.role.includes("admin")) return true;
    }
    if (auth?.user?.role_id == 4) {
      if (d.role.includes("tenant")) return true;
    }
    return false;
  }
  return true;
}

function RowMenuItem({ onClick, path, ...props }) {
  return (
    <MenuItem
      component={path ? Link : "div"}
      href={path}
      onClick={onClick}
      target={props.newTab && "_blank"}
      rel={props.newTab && "noopener noreferrer"}
      sx={props.sx}
    >
      <UI.Row spacing={2} justifyContent="space-between" width="100%">
        <UI.Row spacing={2}>
          <UI.Col minWidth={24}>{props?.icon}</UI.Col>
          <UI.Text variant="body1">{props.label}</UI.Text>
        </UI.Row>
        {props?.endEl}
      </UI.Row>
    </MenuItem>
  );
}
