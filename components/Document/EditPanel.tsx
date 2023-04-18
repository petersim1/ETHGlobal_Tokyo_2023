/* eslint-disable max-len */
import { useState } from "react";
import InputField from "../Elements/Input";
import Button from "../Elements/Button";
import styles from "../../styles/document.module.css";
import { customFormValidation } from "../../utils/helpers";
// import { Biconomy } from "@biconomy/mexa";

import { EditPanelI } from "../../types/documents";
import { useAccount, useSigner, useContract } from "wagmi";

import abi from "../../truffle/abis/smartSAFTAgreement.json";
// import { Contract, ethers } from "ethers";

const EditPanel: React.FC<EditPanelI> = (props): JSX.Element => {
  const { fields, tried, valid, setFields, setTried, setValid, setActive, placeholderObj } = props;
  // const { provider, account } = useContext(MetamaskContext);
  const { address, isConnected, isConnecting } = useAccount();
  const { data: signer } = useSigner();
  const [contractPending, setContractPending] = useState(false);
  const [contractSuccess, setContractSuccess] = useState(false);

  const contract = useContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SAFT || "",
    abi: abi,
    signerOrProvider: signer,
  });

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { value, name } = event.currentTarget;
    setFields((prev) => ({ ...prev, [name]: value }));
    setTried((prev) => ({ ...prev, [name]: false }));
    setValid((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    const isValid = customFormValidation({
      fields: fields,
      fieldsIgnore: [],
      fctInputType: (k: string): string =>
        ["title", "disclosing_party", "receiving_party"].includes(k) ? "text" : "wallet_address",
      setValid: setValid,
      setTried: setTried,
    });

    if (!isValid) return;

    if (contract) {
      contract
        .mint(
          [fields.disclosing_wallet, fields.receiving_wallet],
          `${fields.title}|${"04/16/2023"}|${fields.disclosing_party}|${fields.receiving_party}`,
          Number(process.env.NEXT_PUBLIC_SALTY),
        )
        .then((result: any) => {
          console.log(result);
        });
    }
  };

  const handleFocus = (event: React.FormEvent<HTMLInputElement>): void => {
    const { name } = event.currentTarget;
    setActive((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (event: React.FormEvent<HTMLInputElement>): void => {
    const { name } = event.currentTarget;
    setActive((prev) => ({ ...prev, [name]: false }));
  };

  return (
    <div className={styles.panel}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {placeholderObj.map((obj: any, ind: number) => {
          if (obj.type === "spacer") {
            return <div style={{ height: "30px" }} key={ind} />;
          }
          return (
            <InputField
              key={ind}
              type={obj.type}
              hideLabel={obj.hideLabel}
              placeholder={obj.placeholder}
              value={fields[obj.name as keyof typeof fields]}
              label={obj.label}
              errorMessage={obj.error}
              valid={
                valid[obj.name as keyof typeof fields] || !tried[obj.name as keyof typeof fields]
              }
              name={obj.name}
              onChange={handleChange}
              marginTop={false}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={false}
            />
          );
        })}
        <div className={styles.button_holder}>
          <Button styling="light" disabled={false} large={false}>
            Discard
          </Button>
          <Button styling="green" disabled={false} loader={false} large={false} type="submit">
            {"Activate"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPanel;
