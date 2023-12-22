import { pwd } from "@gh/helper/encryption";

async function handler(req, res) {
  res.status(200).json({
    message: req?.auth,
    isMatched: 'await pwd.check("password", "$2b$05$m.v1jkYLxnugEZFblFMGUOKZut/vGFx6jTIi9VxtGVDduLbfKY7D2")',
  });
}

const loggerMiddleware = (handler) => (req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  return handler({ ...req, auth: "genesha" }, res);
};

export default loggerMiddleware(handler);
