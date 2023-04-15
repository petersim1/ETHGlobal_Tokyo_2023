import "@/styles/globals.css";
import type { AppProps } from "next/app";

import Grid from "@/components/Layout/Grid";
import Sidebar from "@/components/Layout/Sidebar";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Grid>
      <Sidebar />
      <main>
        <Component {...pageProps} />
      </main>
    </Grid>
  );
};

export default App;
