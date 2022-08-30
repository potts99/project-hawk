import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import MainLayout from "../layout/main";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  

  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </QueryClientProvider>
  );
}

export default MyApp;
