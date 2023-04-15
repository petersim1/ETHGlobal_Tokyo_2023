import InputField from "../Elements/Input";
import Button from "../Elements/Button";
import styles from "../../styles/document.module.css";
import { docEditPlaceholders } from "../../constants/initStates";
import { customFormValidation } from "../../utils/helpers";
// import { addDocument } from "../../utils/firebase";
import { EditPanelI } from "../../types/documents";

// import abi from "../../truffle/abis/smartSAFTAgreement.json";
// import { BigNumber } from "ethers";

const EditPanel: React.FC<EditPanelI> = (props): JSX.Element => {
  const { fields, tried, valid, setFields, setTried, setValid, setActive } = props;

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
        <InputField
          type="text"
          hideLabel={false}
          placeholder={docEditPlaceholders.title}
          value={fields.title}
          label="Document Title"
          errorMessage="Must Include a Document Title"
          valid={valid.title || !tried.title}
          name="title"
          onChange={handleChange}
          marginTop={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={false}
        />
        <div style={{ height: "30px" }} />
        <InputField
          type="text"
          hideLabel={false}
          placeholder={docEditPlaceholders.disclosing_party}
          value={fields.disclosing_party}
          label="Disclosing Party"
          errorMessage="Must Input a Disclosing Party Name"
          valid={valid.disclosing_party || !tried.disclosing_party}
          name="disclosing_party"
          onChange={handleChange}
          marginTop={true}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={false}
        />
        <InputField
          type="text"
          hideLabel={true}
          placeholder={docEditPlaceholders.disclosing_wallet}
          value={fields.disclosing_wallet}
          label="Wallet 1"
          errorMessage="Must Input a Valid Wallet Address"
          valid={valid.disclosing_wallet || !tried.disclosing_wallet}
          name="disclosing_wallet"
          onChange={handleChange}
          marginTop={true}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={false}
        />
        <div style={{ height: "30px" }} />
        <InputField
          type="text"
          hideLabel={false}
          placeholder={docEditPlaceholders.receiving_party}
          value={fields.receiving_party}
          label="Receiving Party"
          errorMessage={""}
          valid={valid.receiving_party || !tried.receiving_party}
          name="receiving_party"
          onChange={handleChange}
          marginTop={true}
          disabled={false}
        />
        <InputField
          type="text"
          hideLabel={true}
          placeholder={docEditPlaceholders.receiving_wallet}
          value={fields.receiving_wallet}
          label="Wallet 2"
          errorMessage="Must Input a Valid Receiving Wallet"
          valid={valid.receiving_wallet || !tried.receiving_wallet}
          name="receiving_wallet"
          onChange={handleChange}
          marginTop={true}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={false}
        />
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
