export const docEditInitialStateBool = {
  NDA: {
    title: false,
    disclosing_party: false,
    disclosing_wallet: false,
    receiving_party: false,
    receiving_wallet: false,
  },
  SAFT: {
    purchase_amount: false,
    date: false,
    disclosing_party: false,
    disclosing_wallet: false,
    disclosing_state: false,
    receiving_party: false,
    receiving_wallet: false,
    token_name: false,
  },
};

export const docEditPlaceholders = {
  NDA: {
    title: "Document Title",
    disclosing_party: "Name of Disclosing Party",
    disclosing_wallet: "Wallet...",
    receiving_party: "Name of Receiving Party",
    receiving_wallet: "Wallet...",
  },
  SAFT: {
    purchase_amount: "Purchase Amount",
    date: "Today's Date",
    disclosing_party: "Name of Company with Token",
    disclosing_wallet: "Wallet...",
    disclosing_state: "Geo (state) of Company with Token",
    receiving_party: "Name of Company Funding",
    receiving_wallet: "Wallet...",
    token_name: "Token Name",
  },
};

export const docInputFieldDisplays = {
  NDA: [
    {
      type: "text",
      placeholder: "Document Title",
      label: "Document Title",
      error: "Must Include a Document Title",
      name: "title",
      hideLabel: false,
    },
    {
      type: "spacer",
    },
    {
      type: "text",
      placeholder: "Name of Disclosing Party",
      label: "Disclosing Party",
      error: "Must Input a Disclosing Party Name",
      name: "disclosing_party",
      hideLabel: false,
    },
    {
      type: "text",
      placeholder: "Wallet...",
      label: "Disclosing Wallet",
      error: "Must Input a Valid Wallet Address",
      name: "disclosing_wallet",
      hideLabel: true,
    },
    {
      type: "spacer",
    },
    {
      type: "text",
      placeholder: "Name of Receiving Party",
      label: "Receiving Party",
      error: "Must Input a Receiving Party Name",
      name: "receiving_party",
      hideLabel: false,
    },
    {
      type: "text",
      placeholder: "Wallet...",
      label: "Receiving Wallet",
      error: "Must Input a Valid Wallet Address",
      name: "receiving_wallet",
      hideLabel: true,
    },
  ],
  SAFT: [
    {
      type: "text",
      placeholder: "Document Title",
      label: "Document Title",
      error: "Must Include a Document Title",
      name: "title",
      hideLabel: false,
    },
    {
      type: "spacer",
    },
    {
      type: "text",
      placeholder: "Token Name",
      label: "Token Name",
      error: "Input a valid token name",
      name: "token_name",
      hideLabel: false,
    },
    {
      type: "spacer",
    },
    {
      type: "text",
      placeholder: "Planned Purchase Amount",
      label: "Purchase Amount",
      error: "Input a valid purchase amount",
      name: "purchase_amount",
      hideLabel: false,
    },
    {
      type: "spacer",
    },
    {
      type: "text",
      placeholder: "Date...",
      label: "Today's Date",
      error: "Input a valid date obj",
      name: "date",
      hideLabel: false,
    },
    {
      type: "spacer",
    },
    {
      type: "text",
      placeholder: "Name of Disclosing Party",
      label: "Disclosing Party",
      error: "Must Input a Disclosing Party Name",
      name: "disclosing_party",
      hideLabel: false,
    },
    {
      type: "text",
      placeholder: "Wallet...",
      label: "Disclosing Wallet",
      error: "Must Input a Valid Wallet Address",
      name: "disclosing_wallet",
      hideLabel: true,
    },
    {
      type: "spacer",
    },
    {
      type: "text",
      placeholder: "Name of Receiving Party",
      label: "Receiving Party",
      error: "Must Input a Receiving Party Name",
      name: "receiving_party",
      hideLabel: false,
    },
    {
      type: "text",
      placeholder: "State of Receiving Party",
      label: "Receiving Party State",
      error: "Must Input a Receiving Party State",
      name: "receiving_state",
      hideLabel: true,
    },
    {
      type: "text",
      placeholder: "Wallet...",
      label: "Receiving Wallet",
      error: "Must Input a Valid Wallet Address",
      name: "receiving_wallet",
      hideLabel: true,
    },
  ],
};

export const docEditInitialState = {
  NDA: {
    title: "",
    disclosing_party: "",
    disclosing_wallet: "",
    receiving_party: "",
    receiving_wallet: "",
  },
  SAFT: {
    title: "",
    purchase_amount: "",
    date: "",
    disclosing_party: "",
    disclosing_wallet: "",
    receiving_state: "",
    receiving_party: "",
    receiving_wallet: "",
    token_name: "",
  },
};
