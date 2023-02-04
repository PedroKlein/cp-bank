import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "@picocss/pico/css/pico.min.css";
import "../styles/global.scss";
import "../styles/custom.scss";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { ThemeProvider } from "../hooks/useThemeContext";
import { SWRConfig } from "swr";
import { SWR_CONFIG } from "../configs/swr.config";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig value={SWR_CONFIG}>
        <ThemeProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </SWRConfig>
    </SessionProvider>
  );
};

export default App;
