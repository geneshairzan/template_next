import React, { useEffect } from "react";
import { useRouter } from "next/router";
import P404 from "../../pages/404";
import PAuth from "../../pages/auth";
import Context from "@context";
import MainLayout from "../layout";
import { navReducer } from "./client";
import { redirect } from "next/navigation";

export default function AppMiddleware({ children }) {
  const r = useRouter();
  const { auth } = React.useContext(Context);

  let publicurl = ["/", "/privacypolicy", "/tnc", "/tos", "/about", "/download"];

  function allowed() {
    if (publicurl.includes(r?.asPath)) return true;

    // if (r?.asPath.includes("super") && !auth?.user?.id) return false;
    // if (!publicurl.includes(r?.asPath) && !auth?.user?.id)return false
    // if (publicurl.includes(r?.asPath)) return true;
    // if (publicurl.includes(r?.asPath)) return true;
    // if (r?.asPath.includes("/download")) return true;
    // if (r?.asPath.includes("/faq")) return true;
    // if (r?.asPath.includes("/faq")) return true;
    // if (r?.asPath == "/account/delete") return true;
    // if (r?.pathname == "/") return true;
    // if (r?.pathname == "/wa") return true;
    // if (auth?.user?.id) return true;
    // if (r?.asPath.includes("/dev")) return true;

    return false;
  }

  function isPublic(params) {
    if (!r.asPath.includes("/u/") && !r.asPath.includes("/s/")) {
      return true;
    }
    return false;
  }

  function isPrivateUser(params) {
    if (r.asPath.includes("/u/") && auth?.user?.role_id == 104) {
      return true;
    }
    return false;
  }

  function isPrivateSuper(params) {
    if (r.asPath.includes("/s/") && auth?.user?.role_id == 1) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (!allowed() && !r.asPath.includes("/u/") && auth?.user?.role_id == 104) {
      console.log("redirecting to dashboard");
      r.push("/u/dashboard");
    }
  }, [r.asPath]);

  if (isPublic()) return <>{children}</>;
  if (isPrivateUser()) return <MainLayout>{children}</MainLayout>;
  if (isPrivateSuper()) return <MainLayout>{children}</MainLayout>;
  return <PAuth />;
}
