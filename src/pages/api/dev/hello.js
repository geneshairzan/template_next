import { pwd } from "@gh/helper/encryption";

export default async function handler(req, res) {
  res.status(200).json({
    message: await pwd.hashing("password"),
    isMatched: await pwd.check("password", "$2b$05$m.v1jkYLxnugEZFblFMGUOKZut/vGFx6jTIi9VxtGVDduLbfKY7D2"),
  });
}
