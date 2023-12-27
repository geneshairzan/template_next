import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import P404 from "../../pages/404";
import { nav, extra } from "@/component/app/_nav";

function navReducer(a, b) {
  let tmp = b.path ? [b.path] : b.child.reduce(navReducer, []);
  return [...a, ...tmp];
}

export default function AppMiddleware({ children }) {
  const router = useRouter();
  const allowedModel = [...nav, ...extra].reduce(navReducer, []);

  function isAllowed(params) {
    if (
      router.pathname == "/" ||
      allowedModel.includes(router.asPath) ||
      allowedModel.map((d) => d.replaceAll("/", "")).includes(router?.query?.model)
    )
      return true;
    return false;
  }

  if (!isAllowed()) {
    return <P404 />;
  }
  return <>{children}</>;
}
