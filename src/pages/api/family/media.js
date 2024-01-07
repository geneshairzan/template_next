import prisma from "@/component/gh/helper/orm";
import { parse, upload } from "@/component/gh/helper/multipart";
import serverMiddleware from "@/component/middleware/server";
import { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";

const handler = async (r, res) => {
  !r?.auth && res.status(401).json({ msg: "un autorized" });
  let model = "media";

  try {
    if (r.method == "POST") {
      let data = await prisma.set(model, { family_id: r?.auth.family_id, ...r.body });

      res.status(200).json(prisma.responseFilter(data));
    } else {
      let data = await prisma.get(model, { family_id: r?.auth.family_id });
      res.status(200).json(prisma.responseFilter(data));
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("bad request");
  }
};

// export default handler;
export default serverMiddleware(handler);
