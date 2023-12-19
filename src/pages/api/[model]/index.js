import prima from "@gh/helper/orm";

export default async function handler(r, res) {
  if (r.method === "POST") {
    res.status(200).json(await prima.set(r.query.model, r?.body));
  } else {
    res.status(200).json(await prima.get(r.query.model));
  }
}
