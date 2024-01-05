import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
import Form from "@gh/form";

import { Stack, Typography, ListItemButton } from "@mui/material";
import Datatables from "@gh/dataTables";
import StarsIcon from "@mui/icons-material/Stars";

import Context from "@context/app";
import { useRouter } from "next/router";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import { getInfo } from "@/model";
import { Menu, Fade } from "@mui/material";
import { TextField, MenuItem, InputAdornment } from "@mui/material";
const status = ["pending", "active", "revoke"];
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function App({ data }) {
  return (
    <Stack flexGrow={1} overflow="auto" spacing={2} pt={3}>
      <Form.Text
        label="ID"
        disabled
        value={data?.id}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <UI.IconButton>
                <ContentCopyIcon />
              </UI.IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Form.Text label="name" value={data?.name} />
      <Form.Text label="end point" value={data?.endpoint} />
      <Form.Text label="token" value={data?.token.substring(0, 5) + " . . . " + data?.token.slice(-5)} />
      <UI.Row justifyContent="flex-end">
        <UI.Button>save</UI.Button>
      </UI.Row>
    </Stack>
  );
}

function RenderInfo({ label, value }) {
  return (
    <UI.Row>
      <UI.Text variant="body1">{label}</UI.Text>
      <UI.Text variant="body1">{value}</UI.Text>
    </UI.Row>
  );
}
