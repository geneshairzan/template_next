import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import P404 from "../../pages/404";
import PAuth from "../../pages/auth";
import { nav, extra } from "@/component/app/_nav";
import Context from "@context";

function navReducer(a, b) {
  let tmp = b.path ? [b.path] : b.child.reduce(navReducer, []);
  return [...a, ...tmp];
}

export default function AppMiddleware({ children }) {
  const router = useRouter();
  const allowedModel = [...nav, ...extra].reduce(navReducer, []);
  const { auth } = React.useContext(Context);

  useEffect(() => {
    if (auth?.user?.id && router.asPath.includes("/auth")) {
      router.push("/home");
    }
  }, [auth?.user]);

  if (!auth?.user?.id && !router.asPath.includes("/p")) return <PAuth />;
  return <>{children}</>;
}
