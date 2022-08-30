import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";

import MainLayout from "../layout/main";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Trail Log</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
