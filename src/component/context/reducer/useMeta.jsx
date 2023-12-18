import React, { useState, useEffect } from "react";
import { fetcher } from "@/component/gh/form/fetcher";

export default function App(props) {
  const [data, setdata] = useState();

  async function fetch(props) {
    let res = await fetcher({
      url: `meta`,
      method: "GET",
    });
    setdata(res);
  }

  useEffect(() => {
    fetch();
  }, []);

  return {
    meta: data,
  };
}
