import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import h from "@gh/helper";
import Userinfo from "./_userinfo";
import Input from "./_input";
import Context from "@context";

export default function Chat({ active, socket }) {
  const { auth } = React.useContext(Context);

  function fromtoFilter(d) {
    if (auth.user.id == active.id) {
      return d.to == active.id && d.from == active.id;
    }
    return d.to == active.id || d.from == active.id;
  }

  return (
    <UI.Col center flexGrow={1}>
      <Userinfo data={active} />
      <RenderMsg msg={socket.messages.filter(fromtoFilter)} />
      <Input onChange={(e) => socket.send(active.id, e)} />
    </UI.Col>
  );
}

function RenderMsg({ msg }) {
  const { auth } = React.useContext(Context);

  let meStyle = {
    right: 0,
    bgcolor: "rgba(0, 92, 75,.1)",
    alignSelf: "flex-end",
  };

  return (
    <UI.Col
      sx={{
        flexGrow: 1,
        p: 2,
        width: "100%",
        position: "relative",
        gap: 2,
      }}
    >
      {msg?.map((d, ix) => (
        <UI.Col
          key={ix}
          sx={{
            minWidth: 120,
            p: 1,
            border: "1px solid lightGrey",
            borderRadius: 2,
            maxWidth: "60%",
            ...(auth.user.id == d.from && meStyle),
          }}
        >
          <UI.Text variant="body1">{d.data}</UI.Text>
          <UI.Text variant="caption" align="right">
            {h.date.format4(d?.ts)}
          </UI.Text>
        </UI.Col>
      ))}
    </UI.Col>
  );
}
