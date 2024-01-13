import jwt from "jsonwebtoken";
import axios from "axios";
import prisma, { extendPrisma } from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";

async function handler(r, res) {
  !r?.auth && res.status(401).json({ msg: "un autorized" });

  let family = await prisma.where("family", { id: r?.auth.family_id });
  let url = `${family?.endpoint}/api/camera_proxy/camera.security_camera`;

  let raw = await axios({
    method: "get",
    url: url,
    headers: {
      authorization: `Bearer ${family?.token}`,
      "Content-Type": "application/json",
    },
    data: {
      entity_id: r.body.id,
    },
  });

  if (raw?.data) return;
  return res.status(401).send(raw);
}

export default serverMiddleware(handler);
