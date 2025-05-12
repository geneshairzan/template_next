export const user = {
  idType: "string",
  includes: {
    role: {
      select: {
        name: true,
      },
    },
  },
  col: [
    { name: "name", label: "Name", w: "auto" },
    { name: "email", label: "Email", w: 200 },
    { name: "role", label: "Role", w: 200 },
  ],

  datamap: (d) => {
    return {
      ...d,
      role: d.companies[0]?.role?.name,
    };
  },
};
