import InputField from "../Elements/Input";
import Button from "../Elements/Button";
import styles from "../../styles/document.module.css";
import { customFormValidation } from "../../utils/helpers";
// import { addDocument } from "../../utils/firebase";
import { EditPanelI } from "../../types/documents";

// import abi from "../../truffle/abis/smartSAFTAgreement.json";
// import { BigNumber } from "ethers";

const EditPanel: React.FC<EditPanelI> = (props): JSX.Element => {
  const { fields, tried, valid, setFields, setTried, setValid, setActive, placeholderObj } = props;

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const { value, name } = event.currentTarget;
    setFields((prev) => ({ ...prev, [name]: value }));
    setTried((prev) => ({ ...prev, [name]: false }));
    setValid((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    // if (!signer || !contract) {
    //   console.log("Contract Not Ready to Transact, since signer or contract don't exist");
    // }

    const isValid = customFormValidation({
      fields: fields,
      fieldsIgnore: [],
      fctInputType: (k: string): string =>
        ["title", "disclosing_party", "receiving_party"].includes(k) ? "text" : "wallet_address",
      setValid: setValid,
      setTried: setTried,
    });

    if (!isValid) return;

    console.log("everything looks good");
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
