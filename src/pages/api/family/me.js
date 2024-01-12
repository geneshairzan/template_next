import jwt from "jsonwebtoken";
import axios from "axios";
import prisma, { extendPrisma } from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";

async function handler(r, res) {
  !r?.auth && res.status(401).json({ msg: "un autorized" });
  if (!r?.auth?.family_id) res.status(200).json({});

  let family = await prisma.where("family", { id: r?.auth.family_id });
  res.status(200).json(family);
}

export default serverMiddleware(handler);
