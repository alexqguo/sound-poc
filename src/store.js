import React, { useReducer } from 'react';

const initialState = {};
export const Store = React.createContext(initialState);

const actions = Object.freeze({
  merge: 'merge',
});

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case actions.merge:
        return { ...state, ...action.newState };
      default:
        throw new Error();
    };
  }, initialState);

  // Just allow one method of setting new state for now
  const update = (newState) => {
    dispatch({ type: actions.merge, newState });
  };

  return <Store.Provider value={{ state, update }}>{children}</Store.Provider>;
};
