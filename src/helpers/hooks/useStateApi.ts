import { useContext } from 'react';

import { APIcontext } from '../ProviderReact';

const useStateApi = () => {
  const contex = useContext(APIcontext);

  if (!contex) throw Error('error context');

  return contex;
};

export default useStateApi;
