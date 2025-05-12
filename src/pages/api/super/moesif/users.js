import prisma, { extendPrisma } from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";

const handler = async (r, res) => {
  !r?.auth && res.status(401).json({ msg: "un autorized" });

  let data = await axios({
    url: param.url.includes("http") ? param.url : `${process.env.NEXT_PUBLIC_APP_URL}/api/${param.url}`,
    headers: {
      authorization: process.env.NEXT_PUBLIC_APP_URL,
      "Content-Type": multipart ? `multipart/form-data` : "application/json",

      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",

      "access-x": Md5.hashStr(accX + saltY),
      "access-y": saltY,
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });

  res.status(200).json(data);
};

export default serverMiddleware(handler);
