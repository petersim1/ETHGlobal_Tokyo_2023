export type ButtonI = {
  disabled: boolean;
  children?: React.ReactNode;
  styling: string;
  large: boolean;
  [key: string]: any;
};

export type ActionI = {
  disabled: boolean;
  link: string;
  styling: string;
  [key: string]: any;
};

export type TagI = {
  address: string;
  ready: boolean;
  fill?: boolean;
};

export type ReceiptI = {
  link: string;
  [key: string]: any;
};
