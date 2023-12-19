import axios from "axios";
import { Md5 } from "ts-md5";

const accX = "w}5opZ%3oIQ6Vq(PUsTL";
const accY = new Date().getTime();

export const fetcher = async ({ saltY = accY, ...param }) => {
  const token = localStorage.getItem("AuthToken");

  try {
    const res = await axios({
      ...param,
      url: `${import.meta.env.VITE_BEURL}/api/${param.url}`,
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        authorization: `Bearer ${token}`,
        "access-x": Md5.hashStr(accX + saltY),
        "access-y": saltY,
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    if (res?.data?.status?.code == 200) return res.data.data;
    if (res?.data?.status?.code == 401) {
      localStorage.clear();
      window.location.href = "/";
    }
  } catch (error) {
    if (error?.response?.status == 401) {
      localStorage.clear();
      window.location.href = "/";
    }
  }
};

export const fetcherMultipart = async (param) => {
  const token = localStorage.getItem("AuthToken");
  const config = {
    ...param,
    url: `${import.meta.env.VITE_BEURL}/api/${param.url}`,
    headers: {
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data`,
      authorization: `Bearer ${token}`,
      "access-x": Md5.hashStr(accX + accY),
      "access-y": accY,
    },
  };

  try {
    const res = await axios(config);
    if (res?.data?.status?.code == 200) return res.data.data;
    if (res?.data?.status?.code == 401) {
      localStorage.clear();
      window.location.href = "/auth/signin";
    }
    return res.status;
  } catch (error) {
    console.log(error);
    if (error?.response?.status == 401) {
      localStorage.clear();
      window.location.href = "/auth/signin";
    }
    // localStorage.clear();
    // window.location.href = "/auth/signin";
  }
};
