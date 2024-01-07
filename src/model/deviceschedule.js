export const deviceschedule = {
  list: { deleteable: true },
  includes: {
    author: {
      select: {
        name: true,
      },
    },
  },
};
