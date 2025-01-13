import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Form from "@gh/form";

export default function App({ onChange }) {
  const [input, setinput] = useState();

  function handleInput() {
    onChange(input);
    setinput("");
  }
  return (
    <UI.Row center p={2} width="100%" gap={2}>
      <Form.Text
        placeholder="Type a messaage"
        value={input}
        onChange={(e) => setinput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleInput();
            e.preventDefault();
          }
        }}
      />
      <UI.IconButton
        onClick={handleInput}
        name="send"
        iconStyle={{
          ":hover": {
            color: "primary.main",
          },
        }}
      />
    </UI.Row>
  );
}
