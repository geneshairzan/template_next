import prima from "@gh/helper/orm";

export default async function handler(r, res) {
  res.status(200).json(await prima.get(r.query.model, r.query?.id));
}
