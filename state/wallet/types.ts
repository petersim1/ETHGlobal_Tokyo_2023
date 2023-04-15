export type StateContextType = {
  provider: any;
  account: string;
  chainId: string;
  isLoaded: boolean;
  isLoading: boolean;
  isConnected: boolean;
  validChain: boolean;
  requestAccount: () => void;
};
