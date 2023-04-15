import { Dispatch, SetStateAction } from "react";

export type TokenTypeI = {
  tokenId: string;
  docType: string;
  address: {
    disclosing: string;
    receiving: string;
  };
  status: {
    disclosing: boolean;
    receiving: boolean;
  };
  state: string;
};

export type StateContextType = {
  ok: boolean;
  tokens: TokenTypeI[];
  loading: boolean;
  setTokens: Dispatch<SetStateAction<TokenTypeI[]>>;
  setOk: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};
