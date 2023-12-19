import React from "react";
import UI from "@gh/ui";
import Link from "next/link";
import Context from "@/component/context/app";

export default function Pages(props) {
  return (
    <UI.Col overflow="auto" center height="100dvh" width="100vw">
      <UI.Img
        src="/assets/img/app/mr-auth.jpg"
        alt=""
        sx={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          opacity: 0.8,
          width: "100%",
          left: 0,
        }}
      />
    </UI.Col>
  );
}
