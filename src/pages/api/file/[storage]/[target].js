import prisma from "@/component/gh/helper/orm";
import { parse, upload } from "@/component/gh/helper/multipart";
import serverMiddleware from "@/component/middleware/server";
import { getUser } from "@gh/helper/encryption";
import authMiddleware from "@/component/middleware/server/auth";
import FormData from "form-data";
// import { Formidable } from "formidable";
import formidable from "formidable";
import { promises as fs } from "fs";

// const fs = require("fs");
const path = require("path");
var _ = require("lodash");

const handler = async (r, res) => {
  const q = r.query;

  if (!q.target || !q.storage) return res.status(400).send("bad request");

  let filePath = path.resolve(`storage/upload/${q.storage}/${q.target}`);

  try {
    const data = await fs.readFile(filePath);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).end("Error reading file");
  }
};

export default handler;
// export default serverMiddleware(handler);
