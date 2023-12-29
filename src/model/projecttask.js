export const projecttask = {
  label: "project task",
  includes: { status: true },

  col: [
    { name: "title", label: "Title", w: 220 },
    { name: "status", label: "Status", w: "auto" },
  ],
  datamap: (d) => {
    return {
      ...d,
      status: d?.status?.name,
    };
  },
  form: {
    pic_id: {
      m_label: "PIC",
      m_url: "user",
    },
  },
};
