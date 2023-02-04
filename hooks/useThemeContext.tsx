import React, { createContext, useContext, useMemo } from "react";
import usePersistedState from "./usePersistedState";

type ThemeType = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeType>(null);

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = usePersistedState<boolean>("darkmode", false);

  const themeState = useMemo(
    () => ({ darkMode, setDarkMode }),
    [darkMode, setDarkMode]
  );

  return (
    <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
