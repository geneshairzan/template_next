import jwt from "jsonwebtoken";
// import key from "@storage/private.pem";
const fs = require("fs");

export default async function handler(req, res) {
  var privateKey = fs.readFileSync("storage/private.pem");
  const token = jwt.sign({ name: "user.name", email: "user.email" }, privateKey, { algorithm: "RS256" });

  res.status(200).json({
    token: token,
  });
}
