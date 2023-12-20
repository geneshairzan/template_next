import React from "react";
import UI from "@gh/ui";
import Context from "@context/app";
import Header from "./header";

export default function Layout(props) {
  const { app } = React.useContext(Context);

  return (
    <UI.Col
      alignItems="center"
      width={"100%"}
      maxHeight={"100dvh"}
      height={{ xs: app.mobilescreenheight, md: "100dvh" }}
      sx={{
        position: "absolute",
        overflow: "auto",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        bgcolor: "#fafafa",
      }}
    >
      <Header />
      <UI.Col
        sx={{
          maxWidth: { xs: "100vw", md: "1280px" },
          width: "100%",
          py: 3,
          px: { xs: 2, md: 0 },
          zIndex: 99,
          height: "100dvh",
          overflow: "auto",
          mt: 5,
        }}
      >
        {props.children}
      </UI.Col>

      {app?.isLoading == 1 && <UI.Loader modal={true} />}
      {app?.fetcherCallback != null && (
        <UI.FetcherCallback type={app?.fetcherCallback.type} message={app?.fetcherCallback.message} />
      )}
    </UI.Col>
  );
}
