import UI from "@gh/ui";
import React, { useState, useEffect } from "react";

let config = {
  width: 300,
  color: "#2b343b",
  radius: 24,
  bgcolor: "#4187f6",
  separatorWidth: 12,
};
let menu = ["Home", "Setting", "Profile", "Asset", "Transaction"];

let activeStyle = {
  color: "white",
  bgcolor: config.bgcolor,
};

let preStyle = {
  position: "absolute",
  height: config.radius,
  width: config.radius,
  top: -config.radius,
  right: 0,
  background: config.bgcolor,

  "&::before": {
    content: `""`,
    position: "absolute",
    width: config.radius,
    height: config.radius,
    background: config.color,
    borderBottomRightRadius: config.radius,
  },
};

let postStyle = {
  position: "absolute",
  height: config.radius,
  width: config.radius,
  bottom: -config.radius,
  right: 0,
  background: config.bgcolor,

  "&::before": {
    content: `""`,
    position: "absolute",
    width: config.radius,
    height: config.radius,
    background: config.color,
    borderTopRightRadius: config.radius,
  },
};

export default function App(props) {
  const [active, setactive] = useState(0);
  return (
    <UI.Col flex={1}>
      <UI.Col
        sx={{
          flex: 1,
          width: config.width,
          bgcolor: config.color,
          paddingLeft: 3,
          position: "relative",
          pt: "100px",
        }}
      >
        {menu.map((d, ix) => (
          <MenuItem key={d} label={d} onClick={() => setactive(ix)} active={active == ix} />
        ))}
        <UI.Col
          sx={{
            position: "absolute",
            height: "100%",
            width: config.separatorWidth,
            bgcolor: config.bgcolor,
            right: -config.separatorWidth,
            top: 0,
          }}
        />
      </UI.Col>
    </UI.Col>
  );
}

function MenuItem({ label, active, onClick }) {
  return (
    <UI.Col
      onClick={onClick}
      sx={{
        height: 48,
        pl: `${config.radius}px`,
        color: "white",
        justifyContent: "center",
        ...(active && activeStyle),
        position: "relative",
        borderTopLeftRadius: config.radius,
        borderBottomLeftRadius: config.radius,
      }}
    >
      <UI.Col sx={active && preStyle} />
      <UI.Text variant="h6">{label}</UI.Text>
      <UI.Col sx={active && postStyle} />
    </UI.Col>
  );
}
