import prisma, { extendPrisma } from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import axios from "axios";
import { Md5 } from "ts-md5";

const handler = async (r, res) => {
  !r?.auth && res.status(401).json({ msg: "un autorized" });

  let client = await axios({
    url: `https://api.moesif.com/v1/search/~/users/${r.body.uid}`,
    method: "GET",
    headers: {
      authorization: process.env.MOESIF_MANAGEMENT_API_KEY,
      "Content-Type": "application/json",
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      // "access-x": Md5.hashStr(accX + saltY),
      // "access-y": saltY,
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
    data: {},
  });

  if (client?.data) {
    res.status(200).json(client?.data);
  }
  res.status(500).json("Server Error");
};

export default serverMiddleware(handler);
