import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../utils/themeSlice";
import darkMode from "../assets/night-mode.png";
import lightMode from "../assets/sun1.png";
import { Sun, Moon } from "lucide-react";

function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((store) => store?.theme?.value);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
     <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-full hover:bg-base-300 transition-all cursor-pointer flex items-center justify-center"
    >
      {theme === "dark" ? (
        <Sun className="w-6 h-6 text-yellow-400 drop-shadow" />
      ) : (
        <Moon className="w-6 h-6 text-gray-800" />
      )}
    </button>
  );
}

export default ThemeToggle;
