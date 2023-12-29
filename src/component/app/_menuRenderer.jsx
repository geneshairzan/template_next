import React, { useEffect, useState } from "react";

import UI from "@gh/ui";
import Context from "@context/app";
import { Stack, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { nav, extra } from "./_nav";

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

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function DesktopMenu({ onClick }) {
  const { app, auth } = React.useContext(Context);
  const loc = useRouter();
  const [onOpen, setonOpen] = useState();

  function handleOpen(ix) {
    setonOpen(onOpen == ix ? null : ix);
  }

  return (
    <UI.Col justifyContent="space-between" height="100%" mt={3}>
      <UI.Col px={2} spacing={2}>
        {nav?.map((d, ix) => (
          <RenderMultiMenu
            key={ix}
            d={d}
            onClick={() => handleOpen(ix)}
            open={onOpen == ix}
            ix={ix}
            onSelect={onClick}
          />
        ))}
      </UI.Col>
      <UI.Col px={2} spacing={2}>
        {extra?.map((d, ix) => (
          <RenderMultiMenu
            key={ix}
            d={d}
            onClick={() => handleOpen(ix)}
            open={onOpen == ix}
            ix={ix}
            onSelect={onClick}
          />
        ))}
        <RenderMultiMenu
          d={{ name: "Logout" }}
          sx={{ pt: 2 }}
          onClick={() => {
            auth.signout();
            onClick();
            loc.push("/");
          }}
        />
      </UI.Col>
    </UI.Col>
  );
}

function RenderMultiMenu({ d, onSelect, ...props }) {
  return (
    <>
      <UI.Row
        justifyContent="space-between"
        alignItems="center"
        onClick={() => (d.path ? onSelect() : props.onClick())}
        component={d.path ? Link : "div"}
        href={d.path || "#"}
        sx={props?.sx}
      >
        <UI.Text variant="body1">{d.name}</UI.Text>
        {d?.child?.length > 0 && <>{props.open ? <ExpandLess /> : <ExpandMore />}</>}
      </UI.Row>
      {d?.child?.length > 0 && (
        <Collapse in={props.open} timeout="auto" unmountOnExit>
          <UI.Col spacing={2} pl={3}>
            {d?.child?.filter(rolefilter).map((dx, dix) => (
              <RenderSingleMenu d={dx} key={dix} onClick={onSelect} />
            ))}
          </UI.Col>
        </Collapse>
      )}
    </>
  );
}

function RenderSingleMenu({ d, asButton = false, ...props }) {
  return (
    <UI.Row
      alignItems="center"
      spacing={2}
      component={d.path ? Link : "div"}
      href={d.path || "#"}
      onClick={props.onClick}
      sx={{
        p: {
          color: "#464649",
          textTransform: "capitalize",
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
