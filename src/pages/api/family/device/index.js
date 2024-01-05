import jwt from "jsonwebtoken";
import axios from "axios";
import prisma, { extendPrisma } from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";

async function handler(r, res) {
  !r?.auth && res.status(401).json({ msg: "un autorized" });
  let family = await prisma.where("family", { id: r?.auth.family_id });

  if (r.method == "POST") {
    res.status(200).json(await prisma.update("device", { id: r.body.id, family_id: r?.auth.family_id, ...r.body }));
  } else {
    res.status(200).json(await extendPrisma.device.findMany({ where: { family_id: r?.auth.family_id } }));
  }
}

export default serverMiddleware(handler);
