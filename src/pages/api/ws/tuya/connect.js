import jwt from "jsonwebtoken";
import axios from "axios";
import prisma, { extendPrisma } from "@/component/gh/helper/orm";
import serverMiddleware from "@/component/middleware/server";
import { TuyaContext } from "@tuya/tuya-connector-nodejs";
import mqtt from "mqtt"; // import namespace "mqtt"

// https://developer.tuya.com/en/docs/iot/device-control-best-practice-nodejs?id=Kaunfr776vomb
// https://github.com/tuya/tuya-connector-Nodejs
// https://github.com/codetheweb/tuyapi
// https://www.npmjs.com/package/mqtt#example

let UID = "az17038654197273sQDG";
let deviceId = "ebef28ad8b0a13456axfis";

const tuya = new TuyaContext({
  baseUrl: "https://openapi.tuyaus.com",
  accessKey: "xpqr45dgx3wnugefvsrr",
  secretKey: "3738862d8b134164b6598d5f2d7ad349",
  method: "easy",
});

async function getIceServer() {
  let res = await tuya.request({
    path: `/v1.0/users/${UID}/devices/${deviceId}/webrtc-configs`,
    method: "GET",
  });

  return res?.result;
}

async function gethubConfig() {
  let res = await tuya.request({
    path: "/v1.0/open-hub/access/config",
    method: "POST",
    body: {
      link_id: "06091434-eeef-41ca-ac99-5c167bfc5bd2",
      uid: "az17038654197273sQDG",
      link_type: "mqtt",
      topics: "ipc",
    },
  });
  return res?.result;
}

export { getIceServer, gethubConfig };

async function handler(r, res) {
  let IceServer = await getIceServer();
  let HubConfig = await gethubConfig();

  let subscribeTopic = HubConfig.source_topic.ipc;
  let publishTopic = HubConfig.sink_topic.ipc.replace("moto_id", IceServer?.moto_id).replace("{device_id}", deviceId);

  let client = mqtt.connect(HubConfig.url, {
    clientId: HubConfig.client_id,
    username: HubConfig.username,
    password: HubConfig.password,
    connectTimeout: 4000,
  });

  client.on("connect", () => {
    console.log(`MQTT connected on ${HubConfig.client_id}`);
    client.subscribe(subscribeTopic, (err) => {
      if (!err) {
        console.log(`subscribe mqtt topic '${subscribeTopic}' success`);

        // client.publish("presence", "Hello mqtt");
      }
    });
  });

  client.on("error", (e) => {
    console.log(`MQTT err `, e);
    // client.subscribe("presence", (err) => {
    //   if (!err) {
    //     client.publish("presence", "Hello mqtt");
    //   }
    // });
  });

  //   const device = await tuya.device.detail({
  //     device_id: "ebef28ad8b0a13456axfis",
  //   });

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

  return res.status(200).json({
    IceServer,
    HubConfig,
    publishTopic: publishTopic,
    subscribeTopic: subscribeTopic,
  });
}

export default handler;
