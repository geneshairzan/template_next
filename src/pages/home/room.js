import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Bgimg from "@/component/app/smart/roomBg";
import ChairIcon from "@mui/icons-material/Chair";
const pages = [
  {
    label: "Living Room",
    bg: "/assets/img/bg/living-room.jpg",
  },
  {
    label: "Bed Room",
    bg: "/assets/img/bg/bed-room.jpg",
  },
  {
    label: "Kitchen",
    bg: "/assets/img/bg/kitchen.jpg",
  },
];

const glass = {
  background: "rgba(255, 255, 255, 0.2)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(5px)",
};
export default function App(props) {
  const [activepage, setactivepage] = useState(0);
  return (
    <UI.Stack height={"100dvh"} overflow={"hidden"} width={"100vw"} backgroundColor="#1e1e1e">
      <Bgimg src={pages[activepage].bg} />
      <Panel />

      <RoomNav pages={pages} activepage={activepage} setactivepage={setactivepage} />
    </UI.Stack>
  );
}

function Panel({ pages, activepage, setactivepage }) {
  return (
    <UI.Col
      sx={{
        position: "absolute",
        width: "80%",
        left: "10%",
        height: "80%",
        top: "10%",
        bgcolor: "white",
        borderRadius: "32px",
        ...glass,
        // border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
      center
    ></UI.Col>
  );
}

function RoomNav({ pages, activepage, setactivepage }) {
  return (
    <UI.Col sx={{ position: "absolute", bottom: "5dvh" }} center width="100%">
      <UI.Row
        justifyContent="center"
        sx={{ position: "absolute", bgcolor: "menu.bg", p: 1, borderRadius: "32px", height: 64, ...glass }}
        spacing={5}
      >
        {pages?.map((d, ix) => (
          <RoomNavBtn key={ix} onClick={() => setactivepage(ix)} label={d.label} active={activepage == ix} />
        ))}
      </UI.Row>
    </UI.Col>
  );
}

function RoomNavBtn({ label, active, onClick }) {
  return (
    <UI.Row
      onClick={onClick}
      sx={{
        spacing: 1,
        p: 2,
        height: "100%",
        borderRadius: "30px",
        width: 200,
        bgcolor: active ? "menu.active" : "menu.inactive",
        "& > *": {
          color: active ? "menu.text.active" : "menu.text.inactive",
        },
      }}
      center
    >
      <ChairIcon />
      <UI.Text variant="body1" pl={1}>
        {label} {active ? "y" : "n"}
      </UI.Text>
    </UI.Row>
  );
}
