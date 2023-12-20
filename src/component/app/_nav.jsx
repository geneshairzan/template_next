const nav = [
  {
    name: "Builder",
  },
  // {
  //   name: "Dasboard",
  //   path: "/builder",
  //   // icon: (props) => <IconRender path={dsbhome} {...props} />,
  //   // role: ["admin", "tenant"],
  // },

  {
    name: "Model",
    path: "/builder/model",
    // icon: (props) => <IconRender path={dsbhome} {...props} />,
    // role: ["admin", "tenant"],
    child: [
      {
        name: "List",
        path: "/builder/model",
        // icon: (props) => <IconRender path={dsbhome} {...props} />,
        // role: ["admin", "tenant"],
      },
      {
        name: "Create",
        path: "/builder/model/create",
        // icon: (props) => <IconRender path={dsbhome} {...props} />,
        // role: ["admin", "tenant"],
      },
    ],
  },
  {
    name: "Themes",
    path: "/builder/themes",
    // icon: (props) => <IconRender path={dsbhome} {...props} />,
    // role: ["admin", "tenant"],
  },
  {
    name: "Models",
    sx: { pt: 2 },
  },
];
const adminNav = [
  {
    name: "Dashboard",
    path: "/admin",
    child: [],
  },
  {
    name: "Data",
    // path: "/admin",
    child: [
      {
        name: "Sector",
        path: "/admin/sector",
      },
      {
        name: "Plant",
        path: "/admin/plant",
      },
      {
        name: "Treatment",
        path: "/admin/treatment",
      },
      {
        name: "Progress",
        path: "/admin/progress",
      },
      {
        name: "FAQ",
        path: "/admin/faq",
      },
      {
        name: "Barcode",
        path: "/admin/barcode",
        newTab: true,
      },
    ],
  },
  {
    name: "Users",
    child: [
      {
        name: "Farmers",
        path: "/admin/farmers",
      },
      {
        name: "Customers",
        path: "/admin/customers",
      },
    ],
  },
  {
    name: "Report",
    child: [
      // {
      //   name: "Plant",
      //   path: "#",
      // },
      {
        name: "Payment",
        path: "/admin/report/payment",
      },
    ],
  },
];

function menuGenerator(model) {
  return {
    name: model,
    path: "#",
    // icon: (props) => <IconRender path={dsbhome} {...props} />,
    // role: ["admin", "tenant"],
    child: [
      {
        name: "List",
        path: `/${prefix}/${model}`,
      },
      {
        name: "Create",
        path: `/${prefix}/${model}/create`,
      },
    ],
  };
}

export { nav, adminNav, menuGenerator };
