export const moesif_usermetric = {
  idType: "string",

  col: [
    { name: "id", label: "Invoice #", w: "auto" },
    { name: "email", label: "Email", w: 200 },
    { name: "name", label: "Name", w: 200 },
  ],

  datamap: (d) => {
    return {
      id: d._id,
      email: d?._source?.email,
      name: d?._source?.name,
    };
  },
};
