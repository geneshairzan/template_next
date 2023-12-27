const nav = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  // {
  //   name: "brand",
  //   path: "/brand",
  // },
  {
    name: "Data",
    child: [
      {
        name: "brand",
        path: "/brand",
      },
      {
        name: "Status",
        path: "/status",
      },
      {
        name: "category",
        path: "/category",
      },
      {
        name: "sub category",
        path: "/subcategory",
      },
      {
        name: "product",
        path: "/product",
      },
      {
        name: "organization",
        path: "/organization",
      },
      {
        name: "location",
        path: "/location",
        // newTab: true,
      },
      {
        name: "sample",
        path: "/sample",
        // newTab: true,
      },
    ],
  },
];

const extra = [
  {
    name: "About Us",
    path: "/about",
  },
  {
    name: "Terms & Condition",
    path: "/tnc",
  },
  {
    name: "Privacy & Policy",
    path: "/privacypolicy",
  },
];

export { nav, extra };
