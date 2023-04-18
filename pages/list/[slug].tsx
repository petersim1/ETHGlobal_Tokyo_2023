import type { GetServerSideProps } from "next";
import { useState, useEffect, useContext } from "react";
import classNames from "classnames";

import Header from "../../components/Document/Header";
import Listed from "../../components/Document/Listed";
import styles from "../../styles/document.module.css";
import Action from "../../components/Elements/Action";
import { TokensContext } from "@/state/tokens";
import { TokenTypeI } from "@/state/tokens/types";
import { useAccount } from "wagmi";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = (context.query.slug as string) || "SAFT";
  const activeStr = (context.query.active as string) || "true";

  return {
    props: {
      docType: slug,
      activeStr,
    },
  };
};

const Docs = ({ docType, activeStr }: { docType: any; activeStr: string }): JSX.Element => {
  const { tokens } = useContext(TokensContext);
  const { address } = useAccount();

  const [active, setActive] = useState<boolean>(String(activeStr) !== "false");
  const [timeframe, setTimeframe] = useState("month");
  const [checked, setChecked] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [numActive, setNumActive] = useState(0);
  const [numClosed, setNumClosed] = useState(0);
  const [trimmedTokens, setTrimmedTokens] = useState<TokenTypeI[]>([]);

  useEffect(() => {
    if (tokens.length > 0) {
      const tokensTrimmed = tokens.filter((token) => {
        return token.docType === docType;
      });
      tokensTrimmed.forEach((token) => {
        setTrimmedTokens((prev) => [...prev, token]);
        if (token.status.disclosing && token.status.receiving) {
          setNumClosed((prev) => prev + 1);
        } else {
          setNumActive((prev) => prev + 1);
        }
      });
      setFetched(true);
    }

    return () => {
      setTrimmedTokens([]);
      setNumActive(0);
      setNumClosed(0);
    };
  }, [tokens]);

  return (
    <div className={styles.main_holder}>
      <Header
        active={active}
        setActive={setActive}
        time={timeframe}
        setTime={setTimeframe}
        numActive={numActive}
        numClosed={numClosed}
        setChecked={setChecked}
      />
      {fetched && trimmedTokens.length > 0 && (
        <Listed
          active={active}
          contracts={trimmedTokens}
          timeframe={timeframe}
          readyOnly={checked}
          address={address}
        />
      )}
      {fetched && trimmedTokens.length === 0 && (
        <div className={classNames(styles.all_empty)}>
          <div>You have no documents await signatures</div>
          <div>
            <Action
              styling="dark"
              disabled={false}
              link="/new/SAFT"
              style={{ color: "var(--bg-main)" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Docs;
