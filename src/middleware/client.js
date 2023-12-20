import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import P404 from "../pages/__404";

export default function AppMiddleware({ children }) {
  const router = useRouter();
  const allowedModel = ["product"];

  // if (!allowedModel.includes(router.query.model)) {
  //   return <P404 />;
  // }
  return <>{children}</>;
}
