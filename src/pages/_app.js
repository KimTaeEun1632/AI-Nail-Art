import MainLayout from "@/components/Layout/MainLayout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);
  return getLayout(<Component {...pageProps} />);
}
