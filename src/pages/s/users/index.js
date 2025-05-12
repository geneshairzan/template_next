import React, { useState } from "react";

import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import Datatables from "@gh/dataTables";
import { getInfo } from "@/model";
import Detail from "./_detail";

export default function App(props) {
  const [onDetail, setonDetail] = useState();
  let model = "moesif_usermetric";
  let users = useFetch({
    url: "/super/moesif/usermetric",
  });

  return (
    <UI.Col p={2}>
      {onDetail && <Detail data={onDetail} onClose={() => setonDetail()} />}
      <UI.Text variant="h2" color="primary">
        Users
      </UI.Text>
      {users?.data && (
        <Datatables
          name="model"
          data={users?.data?.map(getInfo(model, "datamap"))}
          col={getInfo(model, "col")}
          NewElement={null}
          extraEl={<UI.Button onClick={() => setformState({})}>+ {model}</UI.Button>}
          onRowClicked={setonDetail}
          rowChecker={true}
          options={{ rowEvenColor: "#ffffff", rowOddColor: "#ffffff" }}
          // clickedEdit={(id) => router.push(`/${router.query.model}/${id}`)}
        />
      )}
    </UI.Col>
  );
}
