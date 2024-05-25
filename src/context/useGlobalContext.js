import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined)
    throw new Error("Context have been use outside the provider");
  return context;
}
