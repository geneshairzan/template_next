import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Icon from "@gh/icon";
import Bgimg from "@/component/app/smart/roomBg";
import ChairIcon from "@mui/icons-material/Chair";

import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/router";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { glass } from "@/component/app/smart/data";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
const config = {
  width: 36,
  widthModifier: 0.6,
};

const PrettoSlider = styled(Slider)({
  zIndex: 2,
  position: "relative",
  // color: "#d6974d",
  width: config.width * config.widthModifier,
  // height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: config.width,
    width: config.width,
    // backgroundColor: "#fff",
    // border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

export default function MasterSlide(params) {
  const [value, setvalue] = useState(40);
  const [on, seton] = useState(true);

  function toggle(params) {
    seton((p) => !p);
  }

  function getValue() {
    if (!on) return 0;
    if (value == 0) return "-";
    return value == 100 ? "M" : value;
  }

  return (
    <UI.Col
      center
      sx={{
        width: 36,
        position: "absolute",
        right: 0,
        top: "20%",
      }}
      spacing={2}
    >
      <UI.Col
        onClick={toggle}
        center
        sx={{
          bgcolor: on ? "smart.main" : "smartSecondary.main",
          borderRadius: "50%",
          width: config.width,
          height: config.width,
          flexShrink: 0,
        }}
      >
        <Icon.Light sx={{ color: !on ? "smart.main" : "smart.dark" }} />
      </UI.Col>
      <UI.Col
        alignItems="center"
        sx={{
          height: 120,
          pb: "32px",
          pt: 1,
          overflow: "visible",
        }}
      >
        <PrettoSlider
          disabled={!on}
          // color={on ? "smartSecondary" : "primary"}
          color={"smartSecondary"}
          slots={{ thumb: CustomSliderThumb }}
          // valueLabelDisplay="auto"
          // aria-label="pretto slider"
          value={on ? value : 0}
          onChange={(e) => setvalue(e.target.value)}
          orientation="vertical"
        />
        <UI.Col
          onClick={toggle}
          alignItems="center"
          justifyContent="flex-end"
          sx={{
            bgcolor: on ? "smartSecondary.main" : "grey",
            borderRadius: "0 0 32px 32px",
            width: config.width * config.widthModifier,
            height: 58,
            flexShrink: 0,
            position: "absolute",
            bottom: "-16px",
            zIndex: 1,
          }}
        >
          <UI.Text variant="body1" color="white" pb={0.5} bold>
            {getValue()}
          </UI.Text>
        </UI.Col>
      </UI.Col>
    </UI.Col>
  );
}

function CustomSliderThumb(props) {
  console.log(props.ownerState);
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <UI.Col
        center
        sx={{
          borderRadius: "50%",
          width: "100%",
          height: "100%",
          bgcolor: !props.ownerState.disabled ? "smart.main" : "grey",
        }}
      >
        <ArrowDropUpIcon
          sx={{
            fontSize: 48,
            color: "smartSecondary.main",
          }}
        />
      </UI.Col>
    </SliderThumb>
  );
}
