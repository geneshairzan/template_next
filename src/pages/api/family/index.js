import prisma from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";

const handler = async (r, res) => {
  !r?.auth && res.status(401).json({ msg: "un autorized" });
  let model = "family";
  try {
    if (r.method == "POST") {
      let data;

      if (r?.body?.family_id) {
        data = await prisma.find(model, r?.body?.family_id);
      } else {
        data = await prisma.set(model, { ...r?.body, owner_id: r?.auth.id });
      }

      if (data?.id) {
        await prisma.update("user", {
          id: r?.auth.id,
          family_id: data.id,
          family_status: r?.body?.family_id ? 0 : 1,
          role_id: 2,
        });
        res.status(200).json(prisma.responseFilter(data));
      }
      res.status(400).json("bad request");
    }
    if (r.method == "DELETE") {
      let data = await prisma.update("organization", r?.body);
      res.status(200).json(prisma.responseFilter(data));

      res.status(200).json(r.body);
    } else {
      let data = await prisma.get("organization");
      res.status(200).json(prisma.responseFilter(data));
    }
  } catch (error) {
    res.status(400).json("bad request");
  }
};

export default serverMiddleware(handler);
