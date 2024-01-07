import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Icon from "@gh/icon";
import MainNav from "@/component/app/smart/mainNav";
import MainHeader from "@/component/app/smart/mainHeader";
import MainGeneralInfo from "@/component/app/smart/mainGeneralInfo";
import RoomCards from "@/component/app/smart/roomCards";
import { rooms, pages } from "@/component/app/smart/data";

import useFetch from "@gh/helper/useFetch";
import Create from "./create";
import h from "@gh/helper";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function App() {
  const data = useFetch({ url: "family/deviceschedule" });
  const [onedit, setonedit] = useState();

  return (
    <UI.Col
      width="100%"
      sx={{
        p: 1,
        pt: "calc(48px + 16px)",
        height: "calc(100% - 32px)",
      }}
    >
      <UI.Col
        spacing={2}
        overflow="auto"
        sx={{
          borderRadius: 3,
          bgcolor: "smartSecondary.main",
          px: 1,
          pt: 2,
          pb: 5,
        }}
      >
        <Create hasSubmit={() => data?.reload()} onClose={setonedit} onedit={onedit} />
        <UI.Col
          flexGrow={1}
          spacing={2}
          overflow="auto"
          sx={{
            "::-webkit-scrollbar": {
              width: "0px",
              height: 0,
            },
          }}
        >
          {data.get()?.map((d, ix) => (
            <NotesCard key={ix} d={d} onedit={setonedit} />
          ))}
        </UI.Col>
      </UI.Col>
    </UI.Col>
  );
}

function NotesCard({ d, onedit }) {
  return (
    <UI.Col
      sx={{
        border: "1px solid ",
        borderColor: "smart.text",
        py: 1,
        pl: 2,
        borderRadius: 3,
        bgcolor: "smart.dark",
      }}
    >
      <UI.Row justifyContent="space-between" alignItems="flex-start">
        <UI.Col justifyContent="space-between" alignItems="flex-start">
          <UI.Row alignItems="center" spacing={1}>
            <UI.Col
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: d.status_id == 1 ? "success.main" : "error.main",
              }}
            />
            <UI.Text
              variant="h6"
              color="primary.main"
              sx={{
                typography: { xs: "body1", md: "h6" },
              }}
            >
              {d?.name || "no title"}
            </UI.Text>
          </UI.Row>
          <UI.Text variant="body1" color="smart.text">
            {`${d?.action?.length || "no"} device automate`}
          </UI.Text>
        </UI.Col>
        <UI.IconButton
          onClick={() => onedit(d)}
          sx={{
            zIndex: 2,
          }}
        >
          <MoreVertIcon />
        </UI.IconButton>
      </UI.Row>
    </UI.Col>
  );
}
