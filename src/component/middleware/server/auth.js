import { getUser } from "@gh/helper/encryption";

const auth = (handler) => async (r, res) => {
  let request_buffer = r;
  request_buffer.auth = await getUser(r);

  return handler(request_buffer, res);
};

export default auth;
