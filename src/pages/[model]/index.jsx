import React, { useState, useEffect } from "react";

import UI from "@gh/ui";

import { Stack, Typography } from "@mui/material";
import Datatables from "@gh/dataTables";

import Context from "@context/app";
import { useRouter } from "next/router";
import useFetch from "@gh/helper/useFetch";
import { getCol, getMap } from "@/component/app/abstract/metaLib";

export default function App(props) {
  const router = useRouter();
  const { app } = React.useContext(Context);
  const data = useFetch({ url: router.query.model });

  // const col = [
  //   { name: "name", label: "Name", w: 220 },
  //   { name: "desc", label: "Description", w: "auto" },
  // ];

  // const datamap = (d) => {
  //   return {
  //     ...d,
  //   };
  // };
  const col = getCol(router.query.model);

  return (
    <Stack flexGrow={1} overflow="auto" spacing={2} pr={5}>
      <UI.Stack flexGrow={1}>
        {data.get() && (
          <Datatables
            name="model"
            data={data.get()?.map(getMap(router.query.model))}
            col={col}
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
