import prisma, { extendPrisma } from "@/component/gh/helper/orm";
import { parse, upload, filedelete } from "@/component/gh/helper/multipart";
import serverMiddleware from "@/component/middleware/server";
import { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";
import FormData from "form-data";
// import { Formidable } from "formidable";
import formidable from "formidable";
import { minioClient, ensureBucket } from "@gh/helper/minio";
// import { Client } from "minio";

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
      let url;

      if (raw?.file) {
        const file = raw?.file; // "file" is the form field name
        const stream = fs.createReadStream(raw?.file.filepath);
        const filename = `${Date.now()}-${raw?.filename || raw?.id}`;
        await minioClient.putObject("projectexpenditure", `${raw.storage}/${filename}`, stream, {
          "Content-Type": file.mimetype,
        });

        // await ensureBucket();
        url = `${process.env.MINIO_PUBLIC_URL}/projectexpenditure/${filename}`;
        await extendPrisma[raw.model].update({
          where: {
            id: raw.id,
          },
          data: {
            img_path: filename,
          },
          select: { id: true, img_path: true },
        });
      }
      return res.status(200).json({
        msg: "uploaded",
        url: url,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("bad request");
  }
};

// export default handler;
export default serverMiddleware(handler);
