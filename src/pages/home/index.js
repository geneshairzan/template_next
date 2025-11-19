import React from "react";
import UI from "@gh/ui";
import Context from "@context";
// import { UI as UI2 } from "gh-lib-local";
import { UI as UI2 } from "gh-lib";

export default function App(props) {
  const { auth, r } = React.useContext(Context);
  // console.log(hello("Genesha"));
  return (
    <UI.Col gap={3} p={5}>
      <UI2>tst</UI2>
      <UI.Text variant="body1">This is the homepage</UI.Text>
      <UI.Button onClick={() => r.push("/auth/signin")}>Signin</UI.Button>
      {auth?.id && <UI.Button onClick={() => r.push("/u/dashboard")}>My Dashboard</UI.Button>}
    </UI.Col>
  );
}
