import jwt from "jsonwebtoken";
import axios from "axios";
import prisma, { extendPrisma } from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import { forEach } from "lodash";

async function handler(r, res) {
  !r?.auth && res.status(401).json({ msg: "un autorized" });

  if (r.method == "GET") {
    let family = await prisma.where("family", { id: r?.auth.family_id });
    let raw = await axios({
      url: `${family?.endpoint}/api/states`,
      headers: {
        authorization: `Bearer ${family?.token}`,
        "Content-Type": "application/json",
      },
    });

    return res.status(200).json(raw.data);
  }
}

export default serverMiddleware(handler);
