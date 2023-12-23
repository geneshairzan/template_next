import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import P404 from "../../pages/404";
import { nav, extra } from "@/component/app/_nav";

function navReducer(a, b) {
  let tmp = b.path ? [b.path] : b.child.reduce(navReducer, []);
  return [...a, ...tmp];
  // return [...a, ...tmp.map((d) => d.replaceAll("/", ""))];
}

export default function AppMiddleware({ children }) {
  const router = useRouter();
  // const allowedModel = ["product", "category", "status", "brand"];
  const allowedModel = [...nav, ...extra].reduce(navReducer, []);

  if (router.pathname != "/" && !allowedModel.includes(router.asPath)) {
    return <P404 />;
  }
  return <>{children}</>;
}
