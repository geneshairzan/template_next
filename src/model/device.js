export const device = {
  idType: "string",
  // list: { deleteable: true, viewable: true },
  includes: { access: true },
  // col: [
  //   { name: "name", label: "Name", w: 220 },
  //   { name: "desc", label: "Description", w: "auto" },
  //   { name: "status", label: "Status", w: "auto" },
  //   { name: "brand", label: "Brand", w: "auto" },
  //   { name: "category", label: "Category", w: "auto" },
  //   { name: "location", label: "Location", w: "auto" },
  //   { name: "subcategory", label: "Subcategory", w: "auto" },
  // ],
  // datamap: (d) => {
  //   return {
  //     ...d,
  //     name: d.attributes?.friendly_name,
  //     roomx: "test room",
  //   };
  // },
};
