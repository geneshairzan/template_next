import jwt from "jsonwebtoken";
import axios from "axios";
import prisma, { extendPrisma } from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import { forEach } from "lodash";

async function handler(r, res) {
  !r?.auth && res.status(401).json({ msg: "un autorized" });

  if (r.method == "POST") {
    let family = await prisma.where("family", { id: r?.auth.family_id });
    let raw = await axios({
      url: `${family?.endpoint}/api/states`,
      headers: {
        authorization: `Bearer ${family?.token}`,
        "Content-Type": "application/json",
      },
    });

    let list = raw.data.filter((d) => d.entity_id?.includes("switch."));

    Promise.all(
      await list.map(async (el) => {
        let isSync = await prisma.where("device", { family_id: r?.auth.family_id, ha_entity_id: el.entity_id });

        if (!isSync)
          await prisma.set("device", {
            family_id: r?.auth.family_id,
            ha_entity_id: el.entity_id,
            name: el?.attributes?.friendly_name || "unnamed device",
            type_id: 1,
          });
      })
    );

    return res.status(200).json(list);
  }
  return res.status(400).json("bad request");
}

export default serverMiddleware(handler);
