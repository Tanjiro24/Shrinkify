import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      className="flex items-center gap-2 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
    >
      {theme === "light" ? (
        <Moon size={20} className="text-gray-500" />
      ) : (
        <Sun size={20} className="text-yellow-300" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
