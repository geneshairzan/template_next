import prisma from "@gh/helper/orm";
import enc from "@gh/helper/encryption";

import axios from "axios";

export default async function handler(r, res) {
  if (r.method === "POST") {
    let token = r.headers?.authorization.split(" ")[1];

    try {
      let decode = await enc.checkToken(token);
      return res.status(200).json(decode);
    } catch (error) {
      return res.status(500).json("un autorized");
    }
  }
}
