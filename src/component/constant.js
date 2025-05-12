export const userMenu = [
  {
    label: "Application",
  },
  {
    label: "Dashboard",
    path: "/u/dashboard",
    icon: "dashboard",
  },

  {
    label: "Plan & Subscription",
    path: "/u/subscription",
    icon: "table",
  },
  {
    label: "Api Key",
    path: "/u/apikey",
    icon: "key",
  },
  {
    label: "Documentation",
    path: "/u/documentation",
    icon: "description",
  },
  {
    label: "Sandbox",
    path: "/u/sandbox",
    icon: "science",
  },
];

export const adminMenu = [
  {
    label: "Administration",
  },
  {
    label: "Dashboard",
    path: "/s/dashboard",
    icon: "dashboard",
  },

  {
    label: "Plan & Subscription",
    path: "#",
    icon: "table",
  },
  {
    label: "Users",
    path: "/s/users",
    icon: "person",
  },
  {
    label: "Documentation",
    path: "#",
    icon: "description",
  },
];

export const tableConfig = {
  firstColWidth: 300,
  rowHeight: 42,
  minCellWidth: 100,
  bgcolor: "",
  bgcoloreven: "#fff",
  bgcolorodd: "#e8ebf3",
  bgcolorsummary: "rgba(57, 85, 163, .1)",
  bordercolor: "rgba(0,0,0, .1)",
  bgcolorhead: "rgba(57, 85, 163, 1)",
  colorhead: "white",
};
