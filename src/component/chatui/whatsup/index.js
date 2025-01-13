import React, { useEffect, useState } from "react";

import UI from "@gh/ui";
import Menus from "./_menus";
import UserList from "./_userList";
import Chat from "./_chat";
import useSocket from "@/component/useSocket";
import Context from "@context";

export default function App(props) {
  const { auth } = React.useContext(Context);
  const [activeChat, setactiveChat] = useState();
  let socket = useSocket({
    url: process.env.NEXT_PUBLIC_SOCKET_URL,
    uid: auth.user.id,
  });

  return (
    <UI.Row
      sx={{
        border: "1px solid lightGrey",
        borderRadius: 2,
        height: "100%",
        width: "100%",
        overFlow: "hidden",
      }}
    >
      <UI.Col
        sx={{
          borderRight: "1px solid lightGrey",
        }}
      >
        <Menus />
      </UI.Col>
      <UI.Col
        sx={{
          flex: 1,
          borderRight: "1px solid lightGrey",
        }}
      >
        <UI.Text variant="body1" p={2}>
          status : {socket.info?.status}
        </UI.Text>
        {/* <UI.Button
          onClick={() => {
            socket.connect({
              uid: auth.user.id,
            });
          }}
        >
          connect
        </UI.Button> */}
        <UserList onSelected={setactiveChat} selected={activeChat} />
      </UI.Col>
      <UI.Col
        sx={{
          flex: 3,
        }}
      >
        <Chat active={activeChat} socket={socket} />
      </UI.Col>
    </UI.Row>
  );
}
