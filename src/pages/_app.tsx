import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={<span>Loading...</span>} persistor={persistor}>
          <Head>
            <title>Bandage</title>
            <meta name="description" content="E-commerce app" />
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>

          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
