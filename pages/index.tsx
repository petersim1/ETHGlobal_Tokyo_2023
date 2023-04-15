import Head from "next/head";

import DocTotal from "@/components/Table/DocTotal";

const Home = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Smart Contract Contracts</title>
        <meta name="description" content="Pushing legal documents on chain" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DocTotal />
    </div>
  );
};

export default Home;
