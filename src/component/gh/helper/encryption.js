const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

async function hashing(raw, cycle = 5) {
  return await bcrypt.hash(raw, cycle);
}

async function check(raw, hashed) {
  return await bcrypt.compare(raw, hashed);
}

async function getToken(data) {
  var privateKey = fs.readFileSync("storage/private.pem");
  return jwt.sign(data, privateKey, { algorithm: "RS256", expiresIn: 120 });
}

async function checkToken(token) {
  var privateKey = fs.readFileSync("storage/private.pem");
  return jwt.verify(token, privateKey, { algorithm: "RS256" });
}

const enc = { hashing, check, getToken, checkToken };
export default enc;
