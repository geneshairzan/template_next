import prisma from "@/component/gh/helper/orm";
import { parse, upload } from "@/component/gh/helper/multipart";
import serverMiddleware from "@/component/middleware/server";
import { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";
import FormData from "form-data";
// import { Formidable } from "formidable";
import formidable from "formidable";

const fs = require("fs");
const path = require("path");
var _ = require("lodash");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (r, res) => {
  // !r?.auth && res.status(401).json({ msg: "un autorized" });
  // let model = "room";

  try {
    if (r.method == "POST") {
      let raw = await parse(r);
      // return res.status(400).json(raw);

      if (raw?.new_img) {
        let filename = await upload(raw?.new_img, raw?.name, raw?.storage);

        await prisma.update(raw.model, {
          id: raw?.pid,
          img: filename,
        });
      }
      res.status(200).json("uploaded");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("bad request");
  }
};

// export default handler;
export default serverMiddleware(handler);
