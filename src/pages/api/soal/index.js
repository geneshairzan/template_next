import prisma from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";

const handler = async (r, res) => {
  !r?.auth && res.status(401).json({ msg: "un autorized" });

  if (r.method == "POST") {
  } else if (r.method == "DELETE") {
  } else {
    let data = [
      { id: 1, data: "oke" },
      { id: 2, data: "oke2" },
      { id: 3, data: "oke2" },
    ];
    res.status(200).json(prisma.responseFilter(data));
  }
};

export default serverMiddleware(handler);
