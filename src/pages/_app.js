import { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";
import nProgress from "nprogress";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { RTL } from "../components/rtl";
import { SettingsButton } from "../components/settings-button";
import { SplashScreen } from "../components/splash-screen";
import { PersistGate } from "redux-persist/integration/react";
import {
  SettingsConsumer,
  SettingsProvider,
} from "../contexts/settings-context";
import { gtmConfig } from "../config";
import { gtm } from "../lib/gtm";
import { store, persistor } from "redux-store/store";
import { createTheme } from "../theme";
import { createEmotionCache } from "../utils/create-emotion-cache";
import "styles/index.css";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    gtm.initialize(gtmConfig);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Revliterature</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <SettingsProvider>
            <SettingsConsumer>
              {({ settings }) => (
                <ThemeProvider
                  theme={createTheme({
                    direction: settings.direction,
                    responsiveFontSizes: settings.responsiveFontSizes,
                    mode: settings.theme,
                  })}
                >
                  <RTL direction={settings.direction}>
                    <CssBaseline />
                    <Toaster position="top-center" />
                    <SettingsButton />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      {getLayout(<Component {...pageProps} />)}
                    </LocalizationProvider>
                  </RTL>
                </ThemeProvider>
              )}
            </SettingsConsumer>
          </SettingsProvider>
        </PersistGate>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default App;
