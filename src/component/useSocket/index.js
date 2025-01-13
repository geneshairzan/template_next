import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import h from "@gh/helper";
import Context from "@context";
import { functions } from "lodash";
import { io } from "socket.io-client";

export default function useSocket(props) {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  function onIncoming(pm) {
    console.log(messages, pm);
    setMessages((p) => [...p, pm]);
  }

  useEffect(() => {
    const buffer = io(props.url, {
      auth: { uid: props.uid },
    });
    buffer.on("pm:incoming", onIncoming);
    setSocket(buffer);
    // Clean up the socket when the component is unmounted
    return () => {
      buffer.off("pm:incoming", onIncoming);
      buffer.disconnect();
    };
  }, []);

  const send = (to, e) => {
    socket.emit("pm:sent", {
      data: e,
      from: props.uid,
      to: to,
    });
  };

  return { ...socket, send, messages };
}
