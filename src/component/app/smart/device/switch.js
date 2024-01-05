import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
import UseVal from "@/component/app/smart/helper/useVal";
import { grad } from "@/component/app/smart/data";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

export default function App({ D, onClick }) {
  return (
    <UI.Col
      alignItems="center"
      onClick={onClick}
      sx={{
        justifyContent: { xs: "space-between", md: "flex-start" },
        overflow: "hidden",
        height: { xs: 72, md: 180 },
        m: 1,
        borderRadius: 3,
        p: 1,
        px: 1.5,
        ...grad,
      }}
    >
      <UI.Stack
        direction={{ xs: "row", md: "column" }}
        sx={{
          flexGrow: 1,
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: { xs: "space-between", md: "flex-start" },
          position: "relative",
        }}
        width="100%"
        spacing={2}
        // bgcolor={"red"}
      >
        <UI.Col
          sx={{
            // justifyContent: "space-between",
            justifyContent: "space-between",
            height: "100%",
            order: { xs: 1, md: 2 },
            pt: { xs: 0, md: 1 },
            width: "calc(100% - 36px)",
          }}
        >
          <UI.Text
            color="smart.text"
            sx={{
              typography: { xs: "body1", md: "h5" },
              // order: { xs: 1, md: 2 },
            }}
          >
            {D.name || "Switch"}
          </UI.Text>
          <UI.Text
            variant="body2"
            color="smart.textdark"
            sx={{
              typography: { xs: "body2", md: "body1" },
              // order: { xs: 2, md: 1 },
            }}
          >
            {"Active until 06.00"}
          </UI.Text>
        </UI.Col>
        <UI.Col
          center
          sx={{
            flexShrink: 0,
            width: { xs: 72, md: 110 },
            height: { xs: 72, md: 110 },
            bgcolor: D.state == "on" ? "smart.main" : "unset",
            // bgcolor: "red",
            border: "2px solid",
            borderColor: D.state == "on" ? "smart.main" : "smartSecondary.main",
            borderRadius: "50%",
            pl: "2px",
            pt: "2px",
            order: { xs: 2, md: 1 },
            // position: { xs: "relative", md: "absolute" },
            position: "absolute",
            bottom: { xs: 0, md: -24 },
            right: { xs: -32, md: -24 },
            top: { xs: -8, md: "unset" },
          }}
        >
          <WbSunnyIcon
            sx={{
              color: D?.state != "on" ? "smart.main" : "black",
              fontSize: { xs: 32, md: 48 },
            }}
          />
        </UI.Col>
      </UI.Stack>
    </UI.Col>
  );
}
