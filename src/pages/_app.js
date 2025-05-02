import MainLayout from "@/components/Layout/MainLayout";
import { HoverActionProvider } from "@/lib/HoverActionContext";
import { ImagesProvider } from "@/lib/ImagesContext";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const queryClient = new QueryClient();
  const getLayout =
    Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <HoverActionProvider>
          <ImagesProvider>
            {getLayout(<Component {...pageProps} />)}
            <ReactQueryDevtools initialIsOpen={false} />
          </ImagesProvider>
        </HoverActionProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
