import UI from "@gh/ui";
import Notification from "@/component/app/smart/notification";
import Bgimg from "@/component/app/smart/roomBg";
import ChairIcon from "@mui/icons-material/Chair";

import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function App(props) {
  return (
    <UI.Stack>
      <Avatar sx={{ bgcolor: "smart.main" }}>S</Avatar>
    </UI.Stack>
  );
}
