export const notes = {
  list: { deleteable: true },
  includes: {
    author: {
      select: {
        name: true,
      },
    },
  },
};
