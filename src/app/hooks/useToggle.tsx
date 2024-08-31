'use client';

import { useState } from 'react';

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = (p0: boolean) => setState(!state);
  return [state, toggle] as const;
};

export default useToggle;
