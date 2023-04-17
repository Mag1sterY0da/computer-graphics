import { useCallback, useState } from 'react';
import { preferences } from './config/preferences';

export const usePref = () => {
  const [pref, setPref] = useState(preferences);

  const addValue = useCallback((obj, key) => {
    setPref({
      ...pref,
      ...(key && { [key]: { ...pref[key], ...obj } }),
      ...(!key && { ...pref, ...obj })
    });
  }, [pref]);

  return {
    pref,
    addValue
  };
};
