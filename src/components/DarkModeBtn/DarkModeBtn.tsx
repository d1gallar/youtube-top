import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider/ThemeProvider";
import "./DarkModeBtn.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function DarkModeBtn() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme} className="p-0">
      <i className="bi bi-moon-fill darkmode" data-theme={theme}></i>
    </button>
  );
}
