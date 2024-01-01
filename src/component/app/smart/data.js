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
    devices: [
      { id: 1, state: "on", type: "switch", name: "Main Light" },
      { id: 2, state: "off", type: "switch", name: "Ambiance Light" },
      { id: 6, state: "off", type: "switch", name: "linked switch 1", roomLinked: true },
      { id: 7, state: "on", type: "switch", name: "linked switch 2", roomLinked: true },
      { id: 3, state: "on", type: "switch", name: "Floor Light" },
      { id: 4, state: "off", type: "switch", name: "Bathroom Light" },
      { id: 5, state: "on", type: "switch", name: "Some long text named device" },
      { id: 8, state: "off", type: "switch" },
    ],
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

export const grad = {
  background: "rgb(17,7,5)",
  background: "linear-gradient(0deg, rgba(17,7,5,1) 0%,rgba(62,44,36,1) 70%, rgba(62,44,36,1) 100%)",
};
