import { useState, useEffect } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier) => {
    const newState = actions[actionIdentifier](globalState);
    const globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };
  useEffect(() => {
    listeners.push(setState);

    return () => {
      listeners = listeners.fill((l) => !setState);
    };
  }, [setState]);

  return [globalState, dispatch];
};

export const initStore = (userActions, intialState) => {
  if (intialState) {
    globalState = { ...globalState, intialState };
  }
  actions = { ...actions, ...userActions };
};
