import prisma from "@gh/helper/orm";
import { NextResponse } from "next/server";
import { getUser } from "@gh/helper/encryption";

const handler = async (r, res) => {
  let auth = await getUser(r);
  !auth && res.status(401).json("un autorized");

  if (r.method === "POST") {
    let data = await prisma.set(r.query.model, r?.body);
    res.status(200).json(prisma.responseFilter(data));
  } else {
    let data = await prisma.get(r.query.model);
    res.status(200).json(prisma.responseFilter(data));
  }
};

export default handler;
