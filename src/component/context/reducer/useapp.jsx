import { useState } from "react";
import { fetcher, fetcherMultipart } from "@/component/gh/form/fetcher";
import { useNavigate } from "react-router-dom";

export default function App(props) {
  let nav = useNavigate();

  const [app, setappvalue] = useState({
    theme: "light",
    mobilescreenheight: window.innerHeight,
    isLoading: false,
    callback: null,
  });

  function setapp(target, value) {
    setappvalue((prev) => ({ ...prev, [target]: value }));
  }

  function fetcherCallback(props) {
    setappvalue((prev) => ({ ...prev, ["callback"]: props }));
  }

  async function fetch(props, callback = null) {
    setapp("isLoading", true);
    let res = await fetcher(props);
    setapp("isLoading", false);
    if (callback) {
      if (res) {
        fetcherCallback({ type: callback.type, message: callback.message });
      }
    }
    return res;
  }

  async function fetchMultipart(props, callback = null) {
    setapp("isLoading", true);
    let res = await fetcherMultipart(props);
    setapp("isLoading", false);
    if (callback) {
      if (res) {
        fetcherCallback({ type: callback.type, message: callback.message });
      }
    }
    return res;
  }

  return {
    app: {
      ...app,
      fetch,
      fetchMultipart,
      nav,
      fetcherCallback,
    },
    setapp,
  };
}
