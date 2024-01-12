import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Form from "@gh/form";
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
  const [search, setsearch] = useState("");
  const data = useFetch({ url: "family/deviceschedule" });
  const [onedit, setonedit] = useState();

  function onSearch(d) {
    return d?.name?.toLowerCase()?.includes(search.toLowerCase());
  }

  return (
    <UI.Col
      width="100%"
      sx={{
        pt: "calc(48px + 16px)",
        height: "calc(100% - 32px)",
      }}
      spacing={2}
    >
      <UI.Row alignItems="center" spacing={2} justifyContent="space-between">
        <Form.Text noLabel placeholder="search" value={search} onChange={(e) => setsearch(e.target.value)} />
        <Create hasSubmit={() => data?.reload()} onClose={setonedit} onedit={onedit} />
      </UI.Row>
      {data.get()?.filter(onSearch)?.length > 0 ? (
        <UI.Col
          spacing={2}
          overflow="auto"
          sx={{
            borderRadius: 3,
            bgcolor: "smartSecondary.main",
            p: 1,
          }}
        >
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
            {data
              .get()
              ?.filter(onSearch)
              .map((d, ix) => (
                <NotesCard key={ix} d={d} onedit={setonedit} />
              ))}
          </UI.Col>
        </UI.Col>
      ) : (
        <UI.Text variant="body2" align="center" color="smart.text" pt={2}>
          No Automation found
        </UI.Text>
      )}
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
