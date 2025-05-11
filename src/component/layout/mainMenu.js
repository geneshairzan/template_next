import React, { useState } from "react";
import useSwitch from "@gh/useSwitch";

import UI from "@gh/ui";
import Form from "@gh/form";
import { mainMenu } from "@/component/constant";
import Context from "@context";
import access from "@/component/access";
import UserInfo from "./_userInfo";
import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import { userMenu } from "@/component/constant";
import useFetch from "@gh/helper/useFetch";

export function MenuDrawer({ open, onProject = false, onChange, active }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // Check if it's desktop (md = 900px+)
  const notificationOpen = useSwitch();

  return (
    <Drawer
      onClose={() => !isDesktop && open.off()}
      open={true}
      anchor="left"
      // variant={isDesktop ? (open?.ison ? "temporary" : "persistent") : "temporary"}
      variant="persistent"
      // keepMounted
      sx={{
        width: open.ison ? 250 : 64,
        flexShrink: 0,
        position: "relative",
      }}
    >
      <UI.Row>
        <UI.Col
          sx={{
            top: 0,
            left: 0,
            bgcolor: "white",
            height: "100dvh",
            width: open.ison ? 250 : 64,
          }}
        >
          <TopMenu open={open} onProject={onProject} notificationOpen={notificationOpen} />
          <UI.Col
            flex={1}
            sx={{
              display: open.ison ? "flex" : "none",
              gap: 1,
            }}
          >
            <MainList />
            <BottomMenu />
          </UI.Col>
        </UI.Col>
        {notificationOpen.ison && <NotificationRender notificationOpen={notificationOpen} />}
      </UI.Row>
    </Drawer>
  );
}

function NotificationRender({ notificationOpen }) {
  return (
    <UI.Col
      sx={{
        borderLeft: "1px solid lightgrey",
        p: 2,
        // bgcolor: "primary.main",
        minWidth: "calc(100vw - 250px)",
      }}
    >
      <UI.Row alignItems="center" gap={1}>
        <UI.IconButton name="arrow_back_ios" onClick={notificationOpen.off} />
        <UI.Text variant="h6" bold>
          Notifications
        </UI.Text>
      </UI.Row>
    </UI.Col>
  );
}

function MainList() {
  const { r, auth, app } = React.useContext(Context);

  return (
    <UI.Col flex={1} py={2} px={1} gap={0.5}>
      {userMenu.map((d) =>
        d.path ? (
          <MenuItem label={d.label} path={d.path} icon="circle" />
        ) : (
          <UI.Text variant="body1" bold px={1}>
            {d.label}
          </UI.Text>
        )
      )}
    </UI.Col>
  );
}

function BottomMenu() {
  return (
    <UI.Col
      py={2}
      sx={{
        gap: 1,
        borderTop: "1px solid lightgrey",
      }}
    >
      <UserInfo />
    </UI.Col>
  );
}

function TopMenu({ open, onProject, notificationOpen }) {
  const { r, auth, app } = React.useContext(Context);
  const project = useFetch({ url: `project` });
  return (
    <UI.Col
      sx={{
        p: 2,
        borderBottom: "1px solid lightgrey",
        gap: 1,
      }}
    >
      <UI.Row spaced>
        <UI.Row alignItems="center" gap={1}>
          <UI.IconButton name="menu" onClick={open.toggle} />
          {open.ison && (
            <UI.Text variant="h5" bold color="primary.dark">
              APIP
            </UI.Text>
          )}
        </UI.Row>
        {open.ison && <UI.IconButton name="notifications" onClick={notificationOpen.toggle} />}
      </UI.Row>
    </UI.Col>
  );
}

export function MenuItem({ label, path, onClick, refactive, icon }) {
  const { r } = React.useContext(Context);
  let isActive = refactive || r.asPath == path;

  return (
    <UI.Row
      sx={{
        height: 24,
        py: 2,
        px: 1,
        my: "1px",
        borderRadius: 2,
        gap: 1.5,
        bgcolor: isActive ? "primary.main" : "unset",
        "&:hover": {
          opacity: !isActive && !r.asPath == path && 0.2,
          cursor: "pointer",
          bgcolor: !isActive && "lightgrey",
        },
      }}
      alignItems="center"
      onClick={() => (onClick ? onClick() : r.push(path))}
    >
      {icon && <UI.Icon name={icon} color={isActive ? "white" : "rgba(0, 0, 0, 0.7)"} size={20} />}
      <UI.Text variant="body1" color={isActive ? "white" : "black"}>
        {label}
      </UI.Text>
    </UI.Row>
  );
}
