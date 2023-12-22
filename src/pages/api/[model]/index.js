import prisma from "@gh/helper/orm";
import { NextResponse } from "next/server";
import { getUser } from "@gh/helper/encryption";
import serverMiddleware from "@/component/middleware/server";
import authMiddleware from "@/component/middleware/server/auth";

const handler = async (r, res) => {
  let auth = await getUser(r);

  return res.status(200).json({
    a: auth,
    b: r.auth,
    c: r?.headers || "no header",
    d: r?.body,
    e: r.headers?.authorization?.split(" ")[1],
  });

  !auth && res.status(401).json({ a: "un autorized" });

  if (r.method == "POST") {
    let data = await prisma.set(r.query.model, r?.body);
    res.status(200).json(prisma.responseFilter(data));
  } else {
    let data = await prisma.get(r.query.model);
    res.status(200).json(prisma.responseFilter(data));
  }
};

export default serverMiddleware(handler);
