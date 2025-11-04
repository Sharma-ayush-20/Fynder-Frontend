import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../utils/themeSlice";
import darkMode from "../assets/night-mode.png";
import lightMode from "../assets/sun1.png";

function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((store) => store?.theme?.value);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="btn btn-ghost flex items-center gap-4"
    >
      {theme === "dark" ? (
        <>
          <img className="w-5 h-5 object-contain" src={lightMode} alt="Theme" />
        </>
      ) : (
        <>
          <img className="w-5 h-5 object-contain text-white" src={darkMode} alt="Theme" />
        </>
      )}
    </button>
  );
}

export default ThemeToggle;
