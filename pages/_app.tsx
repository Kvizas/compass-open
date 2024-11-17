import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/global.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}