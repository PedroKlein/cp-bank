import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "../styles/global.scss";
import "../styles/components.scss";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { SWRConfig } from "swr";
import { SWR_CONFIG } from "../configs/swr.config";
import { ThemeProvider } from "next-themes";
import ThemeSwitch from "../components/ThemeSwitch";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig value={SWR_CONFIG}>
        <ThemeProvider>
          <Header />
          <Component {...pageProps} />
          <ThemeSwitch />
          <Footer />
        </ThemeProvider>
      </SWRConfig>
    </SessionProvider>
  );
};

export default App;
