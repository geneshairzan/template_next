import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import P404 from "../../pages/404";
import PAuth from "../../pages/auth";
import { nav, extra } from "@/component/app/_nav";
import Context from "@context/app";

function navReducer(a, b) {
  let tmp = b.path ? [b.path] : b.child.reduce(navReducer, []);
  return [...a, ...tmp];
}

export default function AppMiddleware({ children }) {
  const router = useRouter();
  const allowedModel = [...nav, ...extra].reduce(navReducer, []);
  const { auth } = React.useContext(Context);

  useEffect(() => {
    if (auth?.user?.id) {
      if (!auth?.user?.family_id) {
        router.push("/family/init");
      } else {
        if (!auth?.user.family_status) router.push("/family/waiting");
        if (auth?.user.role_id == 2) router.push("/family/config");
        if (!router.asPath.includes("/home") && auth?.user.role_id == 3) router.push("/home");
      }
    } else {
      if (!router.asPath.includes("/demo")) {
        router.push("/");
      }
    }
  }, [auth?.user]);

  function isAllowed(params) {
    if (
      router.pathname == "/" ||
      allowedModel.includes(router.asPath) ||
      // allowedModel.map((d) => d.replaceAll("/", "")).includes(router?.query?.model) ||
      allowedModel.map((d) => d.replaceAll("/", "")).includes(router.asPath.split("/")[1]) ||
      router.asPath.includes("/home") ||
      router.asPath.includes("/family") ||
      router.asPath.includes("/demo") ||
      router.asPath.includes("/p/")
    )
      return true;
    return false;
  }

  if (!isAllowed()) return <P404 />;
  if (!auth?.user?.id && !router.asPath.includes("/demo")) return <PAuth />;
  return <>{children}</>;
}
