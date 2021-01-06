import { AppStateContext } from "../context";
import { useContext } from "react";

export const useAppState = () => {
  return useContext(AppStateContext);
};
