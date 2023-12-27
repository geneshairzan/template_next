const data = [
  {
    name: "product",
    col: [
      { name: "name", label: "Name", w: 220 },
      { name: "desc", label: "Description", w: "auto" },
      { name: "status", label: "Status", w: "auto" },
      { name: "brand", label: "Brand", w: "auto" },
      { name: "category", label: "Category", w: "auto" },
      { name: "location", label: "Location", w: "auto" },
      { name: "subcategory", label: "Subcategory", w: "auto" },
    ],

    map: (d) => {
      return {
        id: d.id,
        name: d.name,
        desc: d.desc,
        status: d?.status?.name,
        brand: d?.brand?.name,
        category: d?.category?.name,
        subcategory: d?.subcategory?.name,
        location: d?.location?.name,
      };
    },
  },
];

export default data;
