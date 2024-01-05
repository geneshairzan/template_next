import prisma from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";

async function handler(r, res) {
  !r?.auth && res.status(401).json({ msg: "un autorized" });

  if (r.method === "POST") {
    res.status(200).json("under dev");
  } else {
    let data = await prisma.where(r.query.model, {
      id: r.query?.id,
      family_id: r?.auth.family_id,
    });
    res.status(200).json(prisma.responseFilter(data));
  }
}
export default serverMiddleware(handler);
