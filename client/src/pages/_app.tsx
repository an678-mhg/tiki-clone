import "tippy.js/dist/tippy.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "swiper/css";
import "../globals.css";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
import { store } from "../redux";
import { AppProps } from "next/app";
import AppLayout from "../components/Layout/AppLayout";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const nextProgressOptions = {
  color: "#F1D53F",
  showOnShallow: true,
  options: {
    showSpinner: false,
  },
};

const queryClientOptions = {
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
};

const queryClient = new QueryClient(queryClientOptions);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppLayout>
        <QueryClientProvider client={queryClient}>
          <NextNProgress {...nextProgressOptions} />
          <Component {...pageProps} />
          <Toaster />
        </QueryClientProvider>
      </AppLayout>
    </Provider>
  );
}

export default MyApp;
