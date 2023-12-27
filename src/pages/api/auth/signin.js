import prisma from "@/component/gh/helper/orm";
import enc from "@gh/helper/encryption";

import axios from "axios";
import { NextResponse } from "next/server";

export default async function handler(r, res) {
  let user = await prisma.where("user", { email: r.body.email });

  if (user && enc.check(r.body.password, user?.password)) {
    return res.status(200).json(prisma.responseFilter({ ...user, token: await enc.getToken(user) }));
  }
  return res.status(401).json("un autorized");
}
