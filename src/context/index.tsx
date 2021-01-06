import React, { createContext, useReducer } from "react";
import { AppState } from "../types";
import { appData } from "../store/appData";
import { reducer } from "../store/reducer";

interface AppStateContextProps {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, appData);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};
