import React, { useState, useEffect } from "react";
import Form from "@gh/form";
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
import PushPinIcon from "@mui/icons-material/PushPin";
export default function App({ notes }) {
  const [onedit, setonedit] = useState();

  function onSearch(d) {
    return (
      d?.title?.toLowerCase()?.includes(search.toLowerCase()) ||
      d?.author?.name?.toLowerCase()?.includes(search.toLowerCase())
    );
  }

  function pinnedFirst(a, b) {
    return Number(b?.is_pinned) - Number(a?.is_pinned);
  }

  const [search, setsearch] = useState("");

  return (
    <UI.Col
      width="100%"
      sx={{
        pt: "calc(48px + 16px)",
        height: "calc(100% - 32px)",
      }}
    >
      <UI.Col
        spacing={2}
        overflow="auto"
        sx={{
          pt: 2,
          pb: 5,
        }}
      >
        <UI.Row alignItems="center" spacing={2} justifyContent="space-between">
          <Form.Text noLabel placeholder="search" value={search} onChange={(e) => setsearch(e.target.value)} />
          <Create hasSubmit={() => notes.reload()} onClose={setonedit} onedit={onedit} />
        </UI.Row>

        {notes.get()?.filter(onSearch)?.length > 0 ? (
          <UI.Col
            flexGrow={1}
            spacing={2}
            overflow="auto"
            sx={{
              borderRadius: 3,
              bgcolor: "smartSecondary.main",
              p: 1,

              "::-webkit-scrollbar": {
                width: "0px",
                height: 0,
              },
            }}
          >
            {notes
              .get()
              ?.filter(onSearch)
              ?.sort(pinnedFirst)
              .map((d, ix) => (
                <NotesCard d={d} onedit={setonedit} key={ix} />
              ))}
          </UI.Col>
        ) : (
          <UI.Text variant="body2" align="center" color="smart.text" pt={2}>
            No notes found
          </UI.Text>
        )}
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
      position="relative"
    >
      {d?.is_pinned && (
        <PushPinIcon
          sx={{
            color: "smart.main",
            position: "absolute",
            right: 10,
            bottom: 8,
            fontSize: 16,
          }}
        />
      )}
      <UI.Row justifyContent="space-between" alignItems="flex-start">
        <UI.Col justifyContent="space-between" alignItems="flex-start">
          <UI.Text
            variant="h6"
            color="primary.main"
            sx={{
              typography: { xs: "body1", md: "h6" },
            }}
          >
            {d?.title || "no title"} {d?.is_pinned ? "p" : "-"}
          </UI.Text>

          <UI.Text
            color="primary.main"
            sx={{
              typography: { xs: "body2", md: "body1" },
            }}
          >
            {d?.author?.name} | {h.date.format(d.created_at)}
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
      <UI.Text
        variant="body1"
        color="smart.text"
        sx={{
          pt: { xs: 1, md: 2 },
        }}
      >
        {d?.body || "no bbody"}
      </UI.Text>
    </UI.Col>
  );
}
