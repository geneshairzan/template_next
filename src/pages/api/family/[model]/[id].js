import prisma from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import { getInfo } from "@/model";

async function handler(r, res) {
  !r?.auth && res.status(401).json({ msg: "un autorized" });

  if (r.method === "POST") {
    res.status(200).json("under dev");
  } else if (r.method === "DELETE") {
    await prisma.update(r.query.model, {
      // id: r.query?.id,
      id: getInfo(r.query.model, "idType") == "string" ? r.query?.id : parseInt(r.query?.id),
      family_id: r?.auth.family_id,
      deleted_at: new Date(),
    });

    res.status(200).json("deleted");
  } else {
    let data = await prisma.where(r.query.model, {
      // id: r.query?.id,
      id: getInfo(r.query.model, "idType") == "string" ? r.query?.id : parseInt(r.query?.id),
      family_id: r?.auth.family_id,
    });
    res.status(200).json(prisma.responseFilter(data));
  }
}
export default serverMiddleware(handler);
