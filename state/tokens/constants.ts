export const INITIAL_STATE = {
  ok: false,
  loading: false,
  tokens: [],
};

export const INITIAL_STATE_CONTEXT = {
  ...INITIAL_STATE,
  setTokens: (): void => {},
  setOk: (): void => {},
  setLoading: (): void => {},
};
