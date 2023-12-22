import auth from "./auth";
import header from "./header";

const serverMiddleware = (handler) => async (r, res) => {
  console.log("serverMiddleware");
  return header(auth(handler(r, res)));
};

// const middlewareChain = (req, res) => {
//   // Compose middleware functions in the desired order
//   return auth(handler)(req, res);
// };

const middlewareChain = (handler) => async (req, res) => {
  // Compose middleware functions in the desired order
  return header(auth(handler))(req, res);
};

// export default serverMiddleware;
export default middlewareChain;
