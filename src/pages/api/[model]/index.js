import prisma from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";

const handler = async (r, res) => {
  !r?.auth && res.status(401).json({ msg: "un autorized" });

  if (r.method == "POST") {
    let data;
    if (Array.isArray(r?.body)) {
      data = await prisma.manyUpsert(r.query.model, r?.body);
    } else {
      data = await prisma.set(r.query.model, r?.body);
    }

    res.status(200).json(prisma.responseFilter(data));
  } else {
    let data = await prisma.get(r.query.model);
    res.status(200).json(prisma.responseFilter(data));
  }
};

export default serverMiddleware(handler);
