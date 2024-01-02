import React, { useEffect, useState } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
import Drawer from "@mui/material/Drawer";

import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import h from "@gh/helper";

let ex = [
  {
    date: new Date(),
    msg: "Continues failed login attempt detected. If the problem persist and  this is not you, please contact developer.",
  },
  { date: new Date(), msg: "Automation 'Morning Sunshine' cannot execure properly" },
  { date: new Date(), msg: "Schedule 'Morning routine' set off by 'john doe'" },
];

export default function App(props) {
  const [open, setopen] = useState(false);
  const [log, setlog] = useState(ex);

  //   useEffect(() => {
  //     console.log(log);
  //   }, [log]);

  function handleClose(params) {
    let temp = log.map((d) => ({ ...d, hasRead: 1 }));
    setlog(temp);
    setopen(false);
  }

  //   console.log(log);

  return (
    <>
      <UI.IconButton onClick={() => setopen(true)} sx={{ zIndex: 99 }}>
        <Badge badgeContent={log?.filter((d) => !d.hasRead)?.length} color="error">
          <NotificationsIcon color="smart" />
        </Badge>
      </UI.IconButton>
      {open && (
        <Drawer anchor={"right"} open={open} onClose={handleClose}>
          <UI.Col
            sx={{
              width: { xs: "90vw", md: "40vw" },
              height: "100%",
              bgcolor: "smartSecondary.dark",
              p: 3,
              justifyContent: "space-between",
            }}
          >
            <UI.Text variant="h6" color="white" pb={2}>
              Notification Center
            </UI.Text>
            <UI.Col
              sx={{
                flexGrow: 1,
              }}
              spacing={2}
            >
              {log?.map((d, ix) => (
                <LogCard d={d} key={ix} />
              ))}
            </UI.Col>
            <UI.Col center>
              <UI.IconButton
                onClick={handleClose}
                sx={{
                  bgcolor: "white",
                }}
              >
                <Icon.Back
                  sx={{
                    color: "smart.main",
                  }}
                />
              </UI.IconButton>
            </UI.Col>
          </UI.Col>
        </Drawer>
      )}
    </>
  );
}

function LogCard({ d }) {
  return (
    <UI.Col>
      <UI.Text variant="body2" color="smart.main">
        {h.date.format(d?.date)}
      </UI.Text>
      <UI.Text variant="body1" color="smart.text">
        {d?.msg}
      </UI.Text>
    </UI.Col>
  );
}
