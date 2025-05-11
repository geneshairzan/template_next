import React from "react";
import UI from "@gh/ui";
import Context from "@context";

export default function App(props) {
  const { auth, r } = React.useContext(Context);
  return (
    <UI.Col gap={3} p={5}>
      <UI.Text variant="body1">This is the homepage</UI.Text>
      <UI.Button onClick={() => r.push("/auth/signin")}>Signin</UI.Button>
      {auth?.id && <UI.Button onClick={() => r.push("/u/dashboard")}>My Dashboard</UI.Button>}
    </UI.Col>
  );
}
