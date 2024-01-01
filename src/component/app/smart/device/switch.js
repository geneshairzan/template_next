import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
import UseVal from "@/component/app/smart/helper/useVal";
import { grad } from "@/component/app/smart/data";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

export default function App({ D, roomState }) {
  const state = UseVal();

  useEffect(() => {
    if (D?.roomLinked) roomState?.state ? state.setOn() : state.setOff();
  }, [roomState?.state]);

  return (
    <UI.Col
      alignItems="center"
      justifyContent="space-between"
      onClick={state.toggle}
      sx={{
        height: 72,
        m: 1,
        borderRadius: 3,
        p: 1,
        px: 1.5,
        ...grad,
      }}
    >
      <UI.Row justifyContent="space-between" width="100%" spacing={2}>
        <UI.Text variant="body1" color="smart.text">
          {D.name || "Switch"}
        </UI.Text>
        <UI.Col
          center
          sx={{
            flexShrink: 0,
            width: 42,
            height: 42,
            bgcolor: state.val ? "smart.main" : "unset",
            // bgcolor: "red",
            border: "2px solid",
            borderColor: state.val ? "smart.main" : "smartSecondary.main",
            borderRadius: "50%",
            pl: "2px",
            pt: "2px",
          }}
        >
          <WbSunnyIcon
            sx={{
              color: state?.val == 0 ? "smart.main" : "black",
            }}
          />
        </UI.Col>
      </UI.Row>

      <UI.Col width="100%">
        <UI.Text variant="body2" color="smart.textdark">
          {"Active until 06.00"}
        </UI.Text>
      </UI.Col>
    </UI.Col>
  );
}
