import MainLayout from "@/components/Layout/MainLayout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout =
    Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);
  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}
