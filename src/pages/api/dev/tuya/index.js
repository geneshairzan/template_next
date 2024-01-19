import jwt from "jsonwebtoken";
import axios from "axios";
import prisma, { extendPrisma } from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import { TuyaContext } from "@tuya/tuya-connector-nodejs";

// https://developer.tuya.com/en/docs/iot/device-control-best-practice-nodejs?id=Kaunfr776vomb
// https://github.com/tuya/tuya-connector-Nodejs

async function handler(r, res) {
  const tuya = new TuyaContext({
    baseUrl: "https://openapi.tuyaus.com",
    accessKey: "xpqr45dgx3wnugefvsrr",
    secretKey: "3738862d8b134164b6598d5f2d7ad349",
    method: "easy",
  });

  const device = await tuya.device.detail({
    device_id: "ebef28ad8b0a13456axfis",
  });

  // get rtsp link
  // const device = await tuya.request({
  //   // baseUrl: "https://openapi.tuyaus.com",
  //   // accessKey: "xpqr45dgx3wnugefvsrr",
  //   // secretKey: "3738862d8b134164b6598d5f2d7ad349",
  //   path: "/v1.0/users/az17038654197273sQDG/devices/ebef28ad8b0a13456axfis/stream/actions/allocate",
  //   method: "POST",
  //   body: {
  //     type: "rtsp",
  //   },
  // });

  console.log(device);

  return res.status(200).json(device);
}

export default handler;
