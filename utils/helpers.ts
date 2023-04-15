import { NDA, SAFT } from "../constants/documents";
import { CustomFormValidationI } from "../types/documents";

export const canSign = (
  address: string,
  disclosing_wallet: string,
  receiving_wallet: string,
  disclosing_signed: boolean,
  receiving_signed: boolean,
): { readySign: boolean; waitingSign: boolean; doneSign: boolean } => {
  const obj = {
    readySign: false,
    waitingSign: false,
    doneSign: disclosing_signed && receiving_signed,
  };

  if (address === disclosing_wallet) {
    obj.readySign = !disclosing_signed;
    obj.waitingSign = disclosing_signed && !receiving_signed;
  }
  if (address == receiving_wallet) {
    obj.readySign = !receiving_signed;
    obj.waitingSign = receiving_signed && !disclosing_signed;
  }
  return obj;
};

export const customInputValidation = (input: string, input_type: string): boolean => {
  if (input_type === "wallet_address") {
    return /^\S*$/.test(input) && !!input;
  }

  if (input_type === "text") {
    return !!input;
  }

  return true;
};

export const customFormValidation = (props: CustomFormValidationI): boolean => {
  const { fields, fieldsIgnore, fctInputType, setValid, setTried } = props;

  let isValid = true;
  for (const k in fields) {
    if (fieldsIgnore.includes(k)) continue;
    setTried((prev) => ({ ...prev, [k]: true }));
    const v = fields[k as keyof typeof fields];
    const inputType = fctInputType(k);
    // const inputType = ["title", "disclosing_party"].includes(k) ? "text" : "wallet_address";
    if (!customInputValidation(v, inputType)) {
      isValid = false;
      setValid((prev) => ({ ...prev, [k]: false }));
    }
  }
  return isValid;
};

export const getDocMapping = (docType: string): any => {
  let documentUse = NDA;
  if (docType === "SAFE") {
    documentUse = NDA; // To update in the future.
  }
  if (docType == "SAFT") {
    documentUse = SAFT;
  }

  return documentUse;
};

export const docFilter = (
  ndas: any,
  address: string,
  active: boolean,
  readyOnly: boolean,
): any[] => {
  return ndas
    .filter((nda: any) => {
      if (active) {
        if (readyOnly) {
          if (address === nda.wallet.disclosing) {
            return !nda.signed.disclosing;
          } else {
            return !nda.signed.receiving;
          }
        }
        return !nda.signed.disclosing || !nda.signed.receiving;
      }
      return nda.signed.disclosing && nda.signed.receiving;
    })
    .sort((a: any, b: any) => b.tokenId - a.tokenId);
};

export const generateMetaContent = ({ address, docInfo, timeInfo }: any): string => {
  let strOut = `${docInfo.type}|${docInfo.title}|`;
  strOut += `${address}|`;
  strOut += `${docInfo.disclosing_party}|${docInfo.receiving_party}|`;
  strOut += `${timeInfo.created}}`;
  return strOut;
};
