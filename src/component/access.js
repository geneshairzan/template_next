// access map
// direktur : 100
// pm : 101
// finacne : 102
// procurement : 103
// executor : 104
// dirut : 105
export const access = {
  director_utama_approval: (role_id) => {
    if ([1, 105].includes(role_id)) return true;
    return false;
  },
  director_approval: (role_id) => {
    if ([1, 102, 100].includes(role_id)) return true;
    return false;
  },
  pm_approval: (role_id) => {
    if ([1, 101].includes(role_id)) return true;
    return false;
  },
  create_po: (role_id) => {
    if ([1, 102, 103, 100].includes(role_id)) return true;
    return false;
  },
  is_finance: (role_id) => {
    if ([1, 102].includes(role_id)) return true;
    return false;
  },

  isExecutor: (role_id) => {
    if ([104].includes(role_id)) return true;
    return false;
  },

  isPM: (role_id) => {
    if ([1, 101].includes(role_id)) return true;
    return false;
  },

  isDirector: (role_id) => {
    if ([1, 102, 100].includes(role_id)) return true;
    return false;
  },
  isAdmin: (role_id) => {
    if ([1].includes(role_id)) return true;
    return false;
  },
};

export default access;
