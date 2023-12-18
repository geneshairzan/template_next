import "@/assets/css/global.css";
import Layout from "@/component/layout/main";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
