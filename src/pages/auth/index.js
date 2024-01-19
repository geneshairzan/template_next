import React from "react";
import UI from "@gh/ui";
import { AuthForm } from "@gh/modalLogin";
import { glass } from "@/component/app/smart/data";
import Link from "next/link";
import Context from "@/component/context/app";

export default function Pages(props) {
  return (
    <UI.Col overflow="auto" center height="100dvh" width="100vw" bgcolor="grey">
      <img
        src="/assets/img/app/landing-main.webp"
        alt=""
        style={{
          position: "absolute",
          top: 0,
          opacity: 0.8,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          left: 0,
        }}
      />
      <UI.Col
        sx={{
          zIndex: 2,
          height: "100%",
          width: "100%",
        }}
        center
      >
        <AuthForm
          sx={{
            // ...glass,
            background: "rgba(255, 255, 255, 0.6)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            // border: "5px solid white",
          }}
        />
      </UI.Col>
    </UI.Col>
  );
}
