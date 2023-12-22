import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import P404 from "../../pages/404";

export default function AppMiddleware({ children }) {
  const router = useRouter();
  const allowedModel = ["product", "category", "status", "brand"];

  if (router.pathname != "/" && !allowedModel.includes(router.query?.model)) {
    return <P404 />;
  }
  return <>{children}</>;
}
