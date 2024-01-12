import prisma from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";

async function handler(r, res) {
  !r?.auth && res.status(401).json({ msg: "un autorized" });
  let model = "room";

  if (r.method === "POST") {
    let data = await prisma.updateWhere("room", { id: r.query?.id, family_id: r?.auth.family_id }, r.body);
    res.status(200).json(data);
  } else if (r.method === "DELETE") {
    let data = await prisma.updateWhere(
      "room",
      { id: r.query?.id, family_id: r?.auth.family_id },
      { deleted_at: new Date() }
    );
    res.status(200).json(data);
  } else {
    let data = await prisma.find(model, r.query?.id);
    res.status(200).json(prisma.responseFilter(data));
  }
}

export default serverMiddleware(handler);
