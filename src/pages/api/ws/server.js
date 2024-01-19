import { Server } from "socket.io";
import { getIceServer, gethubConfig } from "./tuya/connect";
import mqtt from "mqtt";

let UID = "az17038654197273sQDG";
let deviceId = "ebef28ad8b0a13456axfis";

const SocketHandler = async (req, res) => {
  const { name, address } = getUser();

  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);

    let IceServer = await getIceServer();
    let HubConfig = await gethubConfig();

    let subscribeTopic = HubConfig.source_topic.ipc;
    let publishTopic = HubConfig.sink_topic.ipc.replace("moto_id", IceServer?.moto_id).replace("{device_id}", deviceId);

    console.log(subscribeTopic, publishTopic);

    let MQTTclient = mqtt.connect(HubConfig.url, {
      clientId: HubConfig.client_id,
      username: HubConfig.username,
      password: HubConfig.password,
      connectTimeout: 4000,
    });

    io.on("connection", (socket) => {
      socket.on("input-change", (msg) => {
        console.log(msg);
        socket.broadcast.emit("update-input", msg);
      });

      socket.on("getConfig", (msg) => {
        socket.broadcast.emit("rtc-config-show", {
          raw: msg,
          IceServer,
          HubConfig,
          subscribeTopic: subscribeTopic,
          publishTopic: publishTopic,
        });
      });

      socket.on("webRTCConfigs", (msg) => {
        socket.broadcast.emit("rtc-config", {
          raw: msg,
          IceServer,
          HubConfig,
        });
      });

      socket.on("candidate", (msg) => {
        console.log(msg);

        MQTTclient.publish(publishTopic, {
          Protocol: 302,
          Pv: "2.2",
          T: new Date().valueOf(),
          Data: {
            Header: {
              Type: "disconnect",
              From: subscribeTopic.split("/")[2],
              To: deviceId,
              SubDevID: "",
              SessionID: msg.SessionID,
              MotoID: motoID,
            },
            Message: disconnectFrame,
          },
        });

        // client.publish("presence", "Hello mqtt");
        // socket.broadcast.emit("rtc-config", {
        //   raw: msg,
        //   IceServer,
        //   HubConfig,
        // });
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
