import React, { createContext, useContext } from "react";
import usePersistedState from "./usePersistedState";

type ThemeType = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeType>(null);

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = usePersistedState<boolean>("darkmode", false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
