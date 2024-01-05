import jwt from "jsonwebtoken";
import axios from "axios";
import prisma, { extendPrisma } from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";

let service = [
  {
    name: "toggle",
    endpoint: "services/switch/toggle",
  },
];

async function handler(r, res) {
  !r?.auth && res.status(401).json({ msg: "un autorized" });

  if (r.method == "POST") {
    let family = await prisma.where("family", { id: r?.auth.family_id });

    let url = `${family?.endpoint}/api/${service.find((d) => d.name == r.body.do)?.endpoint || "__badurl"}`;
    if (url.includes("__badurl")) return res.status(400).json("bad request url");

    let raw = await axios({
      method: "post",
      url: url,
      headers: {
        authorization: `Bearer ${family?.token}`,
        "Content-Type": "application/json",
      },
      data: {
        entity_id: r.body.id,
      },
    });

    return res.status(200).json(
      (await extendPrisma.device.findMany({
        where: {
          family_id: r?.auth.family_id,
        },
      })) || []
    );
  }

  return res.status(401).json({ msg: "un autorized" });
}

export default serverMiddleware(handler);
