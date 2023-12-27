import React, { useState, useEffect } from "react";

import UI from "@gh/ui";

import { Stack, Typography } from "@mui/material";
import Datatables from "@gh/dataTables";

import Context from "@context/app";
import { useRouter } from "next/router";
import useFetch from "@gh/helper/useFetch";
import { getInfo } from "@/model";

export default function App(props) {
  const router = useRouter();
  const model = router.query.model;
  const { app } = React.useContext(Context);
  const data = useFetch({ url: model });

  return (
    <Stack flexGrow={1} overflow="auto" spacing={2} pr={5}>
      <UI.Stack flexGrow={1}>
        {data?.get() && (
          <Datatables
            name="model"
            data={data.get().map(getInfo(model, "datamap"))}
            col={getInfo(model, "col")}
            NewElementConfig={{
              to: `${router.query.model}/create`,
              label: `New ${router.query.model}`,
            }}
            rowChecker={true}
            options={{ rowEvenColor: "#ffffff", rowOddColor: "#ffffff" }}
            clickedEdit={(id) => router.push(`/${router.query.model}/${id}`)}
          />
        )}
      </UI.Stack>
    </Stack>
  );
}
