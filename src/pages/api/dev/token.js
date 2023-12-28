import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  var privateKey = fs.readFileSync("storage/key/private.pem");
  const token = jwt.sign({ name: "user.name", email: "user.email" }, privateKey, { algorithm: "RS256" });

  res.status(200).json({
    token: token,
  });
}
