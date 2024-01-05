import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { glass } from "@/component/app/smart/data";
import { useRouter } from "next/router";

export default function App({ D, demo = false }) {
  const loc = useRouter();

  return (
    <UI.Col
      onClick={() => loc.push(`/${demo ? "demo" : "home"}/room/${D.id}`)}
      sx={{
        width: "100%",
        height: "225px",
        flexShrink: 0,
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <UI.Img
        src={"room/" + D.img}
        alt=""
        style={{
          height: "100%",
          objectFit: "cover",
          opacity: 0.8,
        }}
      />
      <UI.Col
        center
        sx={{
          position: "absolute",
          bottom: 0,
          p: 1,
          width: "100%",
        }}
      >
        <CTA D={D} />
      </UI.Col>
    </UI.Col>
  );
}

function CTA({ D }) {
  console.log(D);
  return (
    <UI.Row
      justifyContent="space-between"
      sx={{
        width: "100%",
        alignItem: "center",
        p: 1,
        borderRadius: 64,
        ...glass,
      }}
    >
      <UI.Col pl={2}>
        <UI.Text variant="body1" color="white" capitalize>
          {D.name || D?.label}
        </UI.Text>
        <UI.Text variant="body2" color="smart.text">
          8 Devices Active
        </UI.Text>
      </UI.Col>
      <UI.Col
        center
        sx={{
          bgcolor: "smart.main",
          height: 36,
          width: 36,
          borderRadius: "50%",
        }}
      >
        <ArrowOutwardIcon />
      </UI.Col>
    </UI.Row>
  );
}
