import MainLayout from "@/components/Layout/MainLayout";
import { HoverActionProvider } from "@/lib/HoverActionContext";
import { ImagesProvider } from "@/lib/ImagesContext";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, //5분
            gcTime: 24 * 60 * 60 * 1000, //24시간
          },
        },
      })
  );
  const getLayout =
    Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ImagesProvider>
          <HoverActionProvider>
            {getLayout(<Component {...pageProps} />)}
            <ReactQueryDevtools initialIsOpen={false} />
          </HoverActionProvider>
        </ImagesProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
