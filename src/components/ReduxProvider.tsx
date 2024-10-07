// components/ReduxProvider.tsx
'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';

type Props = {
  children: React.ReactNode;
};

const ReduxProvider: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
