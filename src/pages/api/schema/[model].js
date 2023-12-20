import prisma from "@gh/helper/orm";

export default async function handler(r, res) {
  // res.status(200).json(r.query?.model || {});
  let data = await prisma.getschema(r.query?.model);
  res.status(200).json(prisma.schemaFilter(data) || {});
}
