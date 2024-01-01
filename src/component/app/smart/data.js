import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";

export const pages = [
  {
    label: "Home",
    Icon: HomeIcon,
  },
  {
    label: "Map",
    Icon: MapIcon,
  },
  {
    label: "Calender",
    Icon: CalendarMonthIcon,
  },
  {
    label: "Setting",
    Icon: SettingsIcon,
  },
];

export const rooms = [
  {
    id: 1,
    label: "Living Room",
    src: "/assets/img/bg/living-room.jpg",
  },
  {
    id: 2,
    label: "Bed Room",
    src: "/assets/img/bg/bed-room.jpg",
  },
  {
    id: 3,
    label: "Kitchen",
    src: "/assets/img/bg/kitchen.jpg",
  },
];

export const glass = {
  // background: "rgba(255, 255, 255, 0.2)",
  background: "rgba(40, 40, 40, 0.6)",

  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(5px)",
};
