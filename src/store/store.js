// store.js

import React, { createContext, useReducer } from 'react';
import { initialState, reducer } from './reducer';

const Store = createContext();

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>
      {children}
    </Store.Provider>
  );
};

export { Store as store, StoreProvider };
