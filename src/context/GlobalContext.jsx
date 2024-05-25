import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [isDarkMode, setDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "colour-mode"
  );
  const [redirectUrl, setRedirectUrl] = useLocalStorageState("", "RedirectUrl");

  useEffect(() => {
    document.documentElement.classList = [];
    document.documentElement.classList.add(
      !isDarkMode ? "light-mode" : "dark-mode"
    );
  }, [isDarkMode]);

  function handleToggle() {
    setDarkMode((isdark) => !isdark);
  }

  return (
    <GlobalContext.Provider
      value={{ isDarkMode, handleToggle, redirectUrl, setRedirectUrl }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
export { GlobalContext, GlobalProvider };
