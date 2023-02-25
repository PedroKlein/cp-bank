import React from "react";
import { useThemeContext } from "../../hooks/useThemeContext";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeSwitch: React.FC = () => {
  const { darkMode, setDarkMode } = useThemeContext();

  function switchTheme() {
    setDarkMode((prev) => !prev);
    if (darkMode) document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", "dark");
  }

  return (
    <div
      className="fixed bottom-10 right-0 m-6 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.button
        className="w-12 h-12 bg-gray-200 shadow-sm rounded-full flex justify-center items-center focus:outline-none"
        onClick={switchTheme}
        animate={{
          backgroundColor: !darkMode ? "#f3f4f6" : "#1f2937",
        }}
      >
        {!darkMode ? (
          <FiSun className="text-yellow-500 w-6 h-6" />
        ) : (
          <FiMoon className="text-gray-200 w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
};

export default ThemeSwitch;
