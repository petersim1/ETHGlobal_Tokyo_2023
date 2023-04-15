export const INITIAL_STATE = {
  provider: null,
  account: "",
  chainId: "",
  isLoaded: false,
  isLoading: false,
  isConnected: false,
  validChain: false,
};

export const INITIAL_STATE_CONTEXT = {
  ...INITIAL_STATE,
  requestAccount: (): void => {},
};
