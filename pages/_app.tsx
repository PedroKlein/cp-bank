import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "@picocss/pico/css/pico.min.css";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  );
};

export default App;
