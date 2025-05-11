import React from "react";
import UI from "@gh/ui";
import { projectMenu } from "@/component/constant";
import Context from "@context";

export default function ProjectMenu({ onChange, active }) {
  return (
    <UI.Col
      sx={{
        minWidth: 220,
        py: 5,
      }}
    >
      {/* <UI.Row
        sx={{
          height: 24,
          p: 2,
          opacity: r.asPath == "/" ? 1 : 0.6,
          "&:hover": {
            opacity: !r.asPath == "/" && 0.2,
            cursor: "pointer",
          },
        }}
        alignItems="center"
        onClick={() => r.push(`/`)}
      >
        <UI.Text variant="title" color="white">
          Home
        </UI.Text>
      </UI.Row> */}

      <UI.Text variant="h6" color="grey" px={2} pt={8}>
        PROJECT MENU
      </UI.Text>
      {projectMenu.map((d) => (
        <UI.Row
          sx={{
            height: 24,
            p: 2,
            opacity: active == d.path ? 1 : 0.6,
            "&:hover": {
              opacity: active != d.path && 0.2,
              cursor: "pointer",
            },
          }}
          alignItems="center"
          onClick={() => onChange(d.path)}
        >
          <UI.Text variant="title">{d.label}</UI.Text>
        </UI.Row>
      ))}
    </UI.Col>
  );
}
