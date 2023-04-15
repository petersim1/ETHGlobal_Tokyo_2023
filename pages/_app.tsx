import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Grid from "@/components/Layout/Grid";
import Sidebar from "@/components/Layout/Sidebar";
import { MetamaskProvider } from "@/state/wallet";
import { TokensProvider } from "@/state/tokens";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const supportedNetworks = ["0x1", "0x13881"];

  return (
    <MetamaskProvider supportedNetworks={supportedNetworks}>
      <TokensProvider>
        <Grid>
          <Sidebar />
          <main>
            <Component {...pageProps} />
          </main>
        </Grid>
      </TokensProvider>
    </MetamaskProvider>
  );
};

export default App;
