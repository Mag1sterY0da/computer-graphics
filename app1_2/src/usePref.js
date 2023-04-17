import { useState } from 'react';
import { preferences } from './config/preferences';

export const usePref = () => {
  const [pref, setPref] = useState(preferences);

  const addValue = (obj, key) => {
    setPref({
      ...pref,
      ...(key && { [key]: { ...pref[key], ...obj } }),
      ...(!key && { ...pref, ...obj })
    });
  };

  return {
    pref,
    addValue
  };
};
