import { useState, useEffect } from "react";
import { fetcher } from "@gh/helper/useFetch";

export default function useAuth() {
  const [data, setdata] = useState("loading");

  function signin(res) {
    setdata(res);
    localStorage.setItem("AuthUser", JSON.stringify(res));
    res?.token && localStorage.setItem("AuthToken", res?.token);
  }
  function signout() {
    setdata();
    localStorage.removeItem("AuthUser");
    localStorage.removeItem("AuthToken");
  }

  useEffect(() => {
    let cache = getChachedUser();
    if (cache?.id && check()) {
      setdata(cache);
    } else {
      signout();
    }
  }, []);

  async function check() {
    let res = await fetcher({
      url: `auth/me`,
      method: "post",
    });
    res?.data?.id ? signin(res.data) : signout();
  }

  return {
    user: data,
    signin,
    signout,
    check,
  };
}

function getChachedUser() {
  try {
    return JSON.parse(localStorage.getItem("AuthUser"));
  } catch (error) {
    return {};
  }
}
