import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";

const ThemeButton: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function switchTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="fixed bottom-10 right-0 m-6 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.button
        className="w-12 h-12 bg-[#ececec] shadow-lg rounded-full flex justify-center items-center focus:outline-none"
        onClick={switchTheme}
        animate={{
          backgroundColor: theme === "light" ? "#ececec" : "#1f2937",
        }}
      >
        {theme === "light" ? (
          <FiSun className="text-yellow-500 w-6 h-6" />
        ) : (
          <FiMoon className="text-gray-200 w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
};

export default ThemeButton;
