import React, { useState, useEffect } from "react";

import io from "socket.io-client";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";
// import { socket } from "./socket";

let pc;
let startTime;
let configuration;
let localStream;

const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1,
};

function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

const Home = () => {
  let socket = io();
  const [input, setInput] = useState("");
  const [videoSteam, setvideoSteam] = useState();
  async function call(iceServers) {
    if (!iceServers) {
      console.log("ice server failed");
      return;
    }

    startTime = window.performance.now();

    configuration = {
      iceServers: iceServers,
    };

    console.log("RTCPeerConnection configuration:", configuration);

    pc = new RTCPeerConnection(configuration);
    console.log("Created remote peer connection object pc");

    pc.addEventListener("icecandidate", (e) => onIceCandidate(pc, e));
    pc.addEventListener("iceconnectionstatechange", (e) => onIceStateChange(pc, e));
    pc.addEventListener("track", gotRemoteStream);

    pc.addTransceiver("audio", { direction: "recvonly" });
    pc.addTransceiver("video", { direction: "recvonly" });

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      console.log("Received local stream");
      localStream = stream;
    } catch (e) {
      alert(`getUserMedia() error: ${e.name}`);
    }

    localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
    console.log("Added local stream to pc");

    // Since the remote side has no media stream, we need to pass in the right constraints,
    // in order for it to accept the incoming offer with audio and video.
    try {
      console.log("pc createOffer start");
      const offer = await pc.createOffer(offerOptions);
      console.log("Original Offer:", offer);
      await onCreateOfferSuccess(offer);
    } catch (e) {
      onCreateSessionDescriptionError(e);
    }
  }

  function onCreateSessionDescriptionError(error) {
    console.log(`Failed to create session description: ${error.toString()}`);
  }

  function gotRemoteStream(e) {
    // console.log("Debug........ ", e.track.kind);
    if (e.track.kind === "audio") {
      // disabled audio
      // remoteAudio.srcObject = e.streams[0];
    } else if (e.track.kind === "video") {
      setvideoSteam(e.streams[0]);
      // remoteVideo.srcObject = e.streams[0];
    }
  }

  async function sendCandidate(candidate) {
    try {
      sendWS("candidate", candidate);
    } catch (e) {
      console.log("sendCandidate fail: " + e.name);
    }
  }

  async function onIceCandidate(pc, event) {
    console.log(`ICE candidate:\n${event.candidate ? event.candidate.candidate : "(null)"}`);
    console.log("emit", event.candidate);
    try {
      if (event.candidate != null) {
        socket.emit("candidate", "a=" + event.candidate.candidate);
      } else {
        socket.emit("candidate", "");
      }
    } catch (e) {
      console.log(`failed to add ICE Candidate: ${e.toString()}`);
    }
  }

  async function onCreateOfferSuccess(desc) {
    console.log(`Offer from pc`);
    console.log(JSON.stringify(desc));
    console.log("pc setLocalDescription start");

    try {
      await pc.setLocalDescription(desc);
      onSetLocalSuccess(pc);
    } catch (e) {
      console.log(`Failed to set session description: ${e.toString()}`);
    }

    sendOffer(desc.sdp);
  }

  socket?.on("connect", () => {
    console.log("socket connected");
  });

  socket?.on("rtc-config", (msg) => {
    // console.log(msg);
    call(msg?.IceServer?.p2p_config?.ices);
  });

  socket.on("update-input", (msg) => {
    setInput(msg);
  });

  socket.on("rtc-config-show", (msg) => {
    setInput(msg);
  });

  const onChangeHandler = (e) => {
    // setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };

  useEffect(() => {
    // fetch("/api/ws/server");
    // socketInitializer();
    // TuyaConnect();
  }, []);

  async function TuyaConnect() {
    let res = await fetcher({ url: "ws/tuya/connect" });
    console.log(res?.data);
  }

  async function handleRTCConnect() {
    try {
      socket.emit("webRTCConfigs", {
        agentId: uuid(),
        sessionId: Math.random().toString(36).substring(7),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UI.Col spacing={2}>
      <UI.Text variant="body1">socketing status : {socket?.connected ? "connected" : "disconnected"}</UI.Text>
      <UI.Text variant="body1">{uuid()}</UI.Text>
      <video
        src={videoSteam}
        onLoadedMetadata={(e) =>
          console.log(`Remote video videoWidth: ${e.videoWidth}px,  videoHeight: ${e.videoHeight}px`)
        }
      />
      <input placeholder="Type something" value={input} onChange={onChangeHandler} />
      <UI.Button onClick={handleRTCConnect}>Connect</UI.Button>
      <UI.Button onClick={() => socket.emit("getConfig")}>get config</UI.Button>
      {/* {sockketState && <Child socket={sockketState} key={counter} />} */}
    </UI.Col>
  );
};

export default Home;
