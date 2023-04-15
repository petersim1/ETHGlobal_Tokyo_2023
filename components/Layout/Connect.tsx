import classNames from "classnames";

import { useContext } from "react";
import { MetamaskContext } from "@/state";

import styles from "@/styles/Layout.module.css";

const Connect = (): JSX.Element => {
  const { account, isLoaded, isLoading, isConnected, validChain, requestAccount } =
    useContext(MetamaskContext);

  const handleClick = (): void => {
    if (!account && !isLoading) {
      requestAccount();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={classNames(styles.connect, {
        [styles.address]: isConnected && account,
        [styles.error]: !!account && isLoaded && !validChain,
      })}
    >
      {!account && !isLoading && <div>Connect</div>}
      {isConnected && !!account && validChain && <div>{account}</div>}
      {isLoading && <div>Loading...</div>}
      {!!account && isLoaded && !validChain && <div>Wrong Network!</div>}
    </div>
  );
};

export default Connect;
