import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  polygonMumbai,
  polygonZkEvm,
  polygonZkEvmTestnet,
  scrollTestnet,
  goerli,
  celo,
  celoAlfajores,
  gnosis,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import Grid from "@/components/Layout/Grid";
import Sidebar from "@/components/Layout/Sidebar";
import { TokensProvider } from "@/state/tokens";

const { chains, provider } = configureChains(
  [
    mainnet,
    polygon,
    polygonMumbai,
    polygonZkEvm,
    polygonZkEvmTestnet,
    scrollTestnet,
    goerli,
    celo,
    celoAlfajores,
    gnosis,
  ],
  [alchemyProvider({ apiKey: "Dg5jYzuBr0IOyqXWGc5PwTk0fI10aJP6", priority: 1 }), publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "ETH Global App",
  chains,
});

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <TokensProvider>
          <Grid>
            <Sidebar />
            <main>
              <Component {...pageProps} />
            </main>
          </Grid>
        </TokensProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
