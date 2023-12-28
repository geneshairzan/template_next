export const project = {
  idType: "string",
  includes: {
    projectreference: {
      where: {
        deleted_at: null,
      },
    },
  },

  form: {
    ecxclude_field: [],
    include_field: ["projectreference"],
  },
};
