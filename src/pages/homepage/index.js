import React, { useState, useEffect } from "react";
import { Stack, Typography, Slide, Fade } from "@mui/material";
import Gendev from "./gendev";
import UI from "@gh/ui";

const scrolstep = 200;
const elHeight = 800;

const pages = [
  { name: "p1", order: 0, el: <Gendev.S1 />, subtitle: "" },
  { name: "p2", order: 1, el: <Gendev.S2A />, subtitle: "services" },
  { name: "p2", order: 2, el: <Gendev.S2B />, subtitle: "services" },
  { name: "p2", order: 3, el: <Gendev.S2C />, subtitle: "services" },
  { name: "p2", order: 4, el: <Gendev.AOE />, subtitle: "Area of Exprtise" },
  {
    name: "p2",
    order: 4,
    el: <Gendev.RecentProject />,
    subtitle: "Recent Project",
  },

  {
    name: "footer",
    order: 99,
    el: <Gendev.Footer />,
    subtitle: "",
  },
];

export default function App() {
  const [distance, setdistance] = useState(0);
  const [page, setpage] = useState(0);
  const [tstart, settstart] = useState(0);
  const [oc, sertoc] = useState(0);
  const [fadestate, setfadestate] = useState();
  const [isDisabled, setisDisabled] = useState(false);

  function handleDistance(d) {
    if (d < elHeight * pages.length) distance + d > 0 ? setdistance(Math.ceil(d)) : setdistance(0);
  }

  function handleScroll(e) {
    const isBottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    const isTop = e.target.scrollTop == 0;
    isBottom || isTop ? setisDisabled(false) : setisDisabled(true);
  }

  function handleWheel(e) {
    if (!isDisabled) {
      let av = e.deltaY > 0 ? scrolstep : -scrolstep;
      handleDistance(distance + av);
    }
  }

  function handleTStart(e) {
    settstart(e.touches[0].clientY);
  }

  function handleTMove(e) {
    handleDistance(distance + (tstart - e.changedTouches[0].clientY));
  }

  function getoc() {
    return oc - page;
  }

  useEffect(() => {
    let targetPage = Math.floor(distance / elHeight);
    targetPage > 0 ? setpage(targetPage) : setpage(0);
    sertoc(distance / elHeight);
  }, [distance]);

  useEffect(() => {
    setfadestate(null);
    page != 5 && isDisabled && setisDisabled(false);
  }, [page]);

  useEffect(() => {
    setfadestate(true);
  }, [fadestate]);

  return (
    <Stack
      id="gip"
      height={"100dvh"}
      bgcolor="#191d26"
      onWheel={(e) => !isDisabled && handleWheel(e)}
      onTouchMove={(e) => !isDisabled && handleTMove(e)}
      onTouchStart={(e) => !isDisabled && handleTStart(e)}
      overflow="hidden"
      position={"relative"}
      pt={"32px"}
    >
      {page != 0 && page < pages.length && <Header subtitle={pages[page].subtitle} />}
      <Paginate total={pages.length} active={page} setPage={(v) => setdistance(v)} progress={getoc()} />
      {fadestate && (
        <Fade in={fadestate} timeout={1000}>
          <Stack p={{ xs: 4 }} height={"100%"} px={{ xs: 3, md: "20vw" }}>
            {page == 5 ? <Gendev.RecentProject onScroll={handleScroll} /> : pages[page].el}
          </Stack>
        </Fade>
      )}
    </Stack>
  );
}

function Header({ subtitle }) {
  const [localsub, setlocalsub] = useState(subtitle);
  useEffect(() => {
    localsub != subtitle && setlocalsub(subtitle);
  }, [subtitle]);

  return (
    <UI.Row position={"fixed"} top={0} width="100vw" p={{ xs: 3 }} justifyContent="space-between">
      {localsub == subtitle && (
        <Slide direction="left" in={subtitle == localsub ? true : false} timeout={500}>
          <Typography
            variant="h5"
            color="#ffa229"
            top={24}
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {subtitle}
          </Typography>
        </Slide>
      )}

      <Stack alignItems={"flex-end"}>
        <Typography variant="h5" color="white">
          GENDEV
        </Typography>
        <Typography fontSize={10} color="#ffa229">
          FULLSTACK APP DEV.
        </Typography>
      </Stack>
    </UI.Row>
  );
}

function Paginate({ total, active, setPage, progress }) {
  const size = 10;

  return (
    <Stack position={"fixed"} right={16} bottom={32} alignItems="flex-start" justifyContent={"flex-start"}>
      {[...Array(total)].map((e, i) => (
        <Stack
          key={i}
          width={size}
          height={i == active ? size + 10 * progress : size}
          borderRadius={0.5 * size}
          border={"1px solid #ffa229"}
          bgcolor={i == active ? "#ffa229" : ""}
          onClick={() => setPage(i * elHeight)}
          mb={i == active && -10 * progress + "px"}
          mt={0.8}
        />
      ))}
    </Stack>
  );
}
