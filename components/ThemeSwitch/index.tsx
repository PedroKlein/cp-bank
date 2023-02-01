import React, { useEffect } from "react";
import { useThemeContext } from "../../hooks/useThemeContext";

const ThemeSwitch: React.FC = () => {
  const { darkMode, setDarkMode } = useThemeContext();

  const switchTheme = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    darkMode
      ? document.documentElement.setAttribute("data-theme", "light")
      : document.documentElement.removeAttribute("data-theme");
  }, [darkMode]);

  return (
    <div id="theme-switch" className="container">
      <div className="switch-track">
        <div className="switch-check">
          <span className="switch-icon">🌙</span>
        </div>
        <div className="switch-x">
          <span className="switch-icon">🌞</span>
        </div>
        <div className="switch-thumb"></div>
      </div>

      <input
        type="checkbox"
        checked={darkMode}
        onChange={switchTheme}
        aria-label="Switch between dark and light mode"
      />
    </div>
  );
};

export default ThemeSwitch;
