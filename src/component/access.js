// access map
// direktur : 100
// pm : 101
// finacne : 102
// procurement : 103
// executor : 104
// dirut : 105
export const access = {
  isAdmin: (role_id) => {
    if ([1].includes(role_id)) return true;
    return false;
  },
  isUser: (role_id) => {
    if ([104].includes(role_id)) return true;
    return false;
  },
};

export default access;
