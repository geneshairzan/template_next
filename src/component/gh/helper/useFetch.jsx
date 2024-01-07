import React, { useState, useEffect } from "react";

import axios from "axios";
import { Md5 } from "ts-md5";
import Context from "@context/app";

const accX = "w}5opZ%3oIQ6Vq(PUsTL";
const accY = new Date().getTime();

async function parseFormData(raw) {
  var formData = new FormData();

  Object.keys(raw).forEach(function (key) {
    console.log(key, raw[key]);
    formData.append(key, raw[key]);
  });
  console.log(formData);

  return formData;
}

export const fetcher = async ({ saltY = accY, multipart = false, htoken, ...param }) => {
  const token = htoken || localStorage.getItem("AuthToken");
  try {
    return await axios({
      ...param,
      url: param.url.includes("http") ? param.url : `${process.env.NEXT_PUBLIC_APP_URL}/api/${param.url}`,
      headers: {
        authorization: !param.url.includes("http") && `Bearer ${token}`,
        "Content-Type": multipart ? `multipart/form-data` : "application/json",

        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",

        "access-x": Md5.hashStr(accX + saltY),
        "access-y": saltY,
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    return error?.response.data || error?.code;
  }
};

// export const fetcherMultipart = async (param) => {
//   const token = localStorage.getItem("AuthToken");
//   const config = {
//     ...param,
//     url: `${import.meta.env.VITE_BEURL}/api/${param.url}`,
//     headers: {
//       accept: "application/json",
//       "Accept-Language": "en-US,en;q=0.8",
//       "Content-Type": `multipart/form-data`,
//       authorization: `Bearer ${token}`,
//       "access-x": Md5.hashStr(accX + accY),
//       "access-y": accY,
//     },
//   };

//   try {
//     const res = await axios(config);
//     if (res?.data?.status?.code == 200) return res.data.data;
//     if (res?.data?.status?.code == 401) {
//       localStorage.clear();
//       window.location.href = "/auth/signin";
//     }
//     return res.status;
//   } catch (error) {
//     if (error?.response?.status == 401) {
//       localStorage.clear();
//       window.location.href = "/auth/signin";
//     }
//     // localStorage.clear();
//     // window.location.href = "/auth/signin";
//   }
// };

export default function useFetcher(params) {
  const { app } = React.useContext(Context);
  const [data, setdata] = useState();

  async function fetch(props) {
    app.setOnLoading();
    let res = await fetcher({
      ...props,
    });
    app.setOffLoading();
    return res?.status == 200 ? res.data : null;
  }

  async function prefetch(pre) {
    let data = await fetch(pre);
    setdata(data || []);
  }

  async function reload(pre) {
    setdata([]);
    prefetch(params);
  }

  useEffect(() => {
    params?.url && prefetch(params);
  }, []);

  return {
    get: () => data,
    fetch,
    refetch: (props) => fetch(props || params),
    reload,
  };
}
