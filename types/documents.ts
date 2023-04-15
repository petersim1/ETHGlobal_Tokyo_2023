export type DocsHeaderI = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
  numActive: number;
  numClosed: number;
};

export type DocRowI = {
  tokenid: string;
  title: string;
  date: string;
  walletDisclosing: string;
  signedDisclosing: boolean;
  walletReceiving: string;
  signedReceiving: boolean;
  address: string;
};

export type DocItemI = {
  type: string;
  variable: boolean;
  field?: string;
  text?: string;
};

export type DocItemsI = {
  type: string;
  items: DocItemI[];
  tried?: {
    [key: string]: boolean;
  };
  fields: {
    [key: string]: string;
  };
  valid?: {
    [key: string]: boolean;
  };
  active?: {
    [key: string]: boolean;
  };
  edit: boolean;
};

export type EditPanelStateBoolI = {
  title: boolean;
  disclosing_party: boolean;
  disclosing_wallet: boolean;
  receiving_party: boolean;
  receiving_wallet: boolean;
};

export type EditPanelStateStringI = {
  title: string;
  disclosing_party: string;
  disclosing_wallet: string;
  receiving_party: string;
  receiving_wallet: string;
};

export type EditPanelI = {
  tried: EditPanelStateBoolI;
  fields: EditPanelStateStringI;
  valid: EditPanelStateBoolI;
  setTried: React.Dispatch<React.SetStateAction<EditPanelStateBoolI>>;
  setFields: React.Dispatch<React.SetStateAction<EditPanelStateStringI>>;
  setValid: React.Dispatch<React.SetStateAction<EditPanelStateBoolI>>;
  setActive: React.Dispatch<React.SetStateAction<EditPanelStateBoolI>>;
  placeholderObj: any;
};

export type DocumentConstantI = {
  type: string;
  items: DocItemI[];
};

export type DocumentViewI = {
  doc: DocumentConstantI[];
  tried?: EditPanelStateBoolI;
  fields: EditPanelStateStringI;
  valid?: EditPanelStateBoolI;
  active?: EditPanelStateBoolI;
  edit: boolean;
};

export type DocCollapsedI = {
  title: string;
  disclosing_party: string;
  disclosing_wallet: string;
  receiving_party: string;
  receiving_wallet: string;
  nft_txn: string;
};

export type ViewDocI = {
  documentUse: DocumentConstantI[];
  docInfo: DocCollapsedI;
  tokenId: string;
  signedInfo: {
    disclosing: boolean;
    receiving: boolean;
  };
  timeInfo: {
    created: string;
    disclosing: string;
    receiving: string;
  };
};

export type ViewPanelI = {
  docInfo: DocCollapsedI;
  tokenId: string;
  signedInfo: {
    disclosing: boolean;
    receiving: boolean;
  };
  timeInfo: {
    created: string;
    disclosing: string;
    receiving: string;
  };
};

export type CustomFormValidationI = {
  fields: EditPanelStateStringI;
  fieldsIgnore: string[];
  fctInputType: (k: string) => string;
  setTried: React.Dispatch<React.SetStateAction<EditPanelStateBoolI>>;
  setValid: React.Dispatch<React.SetStateAction<EditPanelStateBoolI>>;
};
