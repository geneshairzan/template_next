import prisma from "@/component/gh/helper/orm";

export default async function handler(r, res) {
  if (r.method === "POST") {
    res.status(200).json("under dev");
  } else {
    let data = await prisma.find(r.query.model, r.query?.id);
    res.status(200).json(prisma.responseFilter(data));
  }
}
