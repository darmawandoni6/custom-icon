import { type FC, type ReactNode, createContext, useState } from 'react';

const initialState: StorageData = {
  count: {
    folder: 0,
    document: 0,
    image: 0,
    video: 0,
    audio: 0,
  },
  slider: {
    folder: [],
    document: [],
  },
  list: {
    data: [],
    meta: {
      page: 1,
      perPage: 10,
      lastPage: 1,
      count: 0,
    },
  },
  user: {},
};

const context = {
  value: initialState,
  setValue: (val: Partial<StorageData>) => {
    context.value = { ...context.value, ...val };
  },
};

export const APIcontext = createContext<typeof context | null>(null);

const ProviderReact: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<StorageData>(initialState);

  const setValue = (val: Partial<StorageData>) => {
    setState((prev) => ({ ...prev, ...val }));
  };

  return <APIcontext.Provider value={{ value: state, setValue }}>{children}</APIcontext.Provider>;
};

export default ProviderReact;
