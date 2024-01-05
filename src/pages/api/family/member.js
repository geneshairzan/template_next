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
      if (r?.body?.id) {
        data = await prisma.update("user", { family_id: r?.auth.family_id, ...r?.body });
      } else {
        let isExist = await prisma.where("user", { email: r?.body?.email });
        if (isExist) res.status(400).json("user exist");

        data = await prisma.set("user", { family_id: r?.auth.family_id, family_status: 1, ...r?.body });
      }
      res.status(200).json(prisma.responseFilter(data));
    } else {
      let data = await prisma.get("user", { family_id: r?.auth.family_id });
      res.status(200).json(prisma.responseFilter(data));
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("bad request");
  }
};

export default serverMiddleware(handler);
