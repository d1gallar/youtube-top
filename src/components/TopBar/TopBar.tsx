import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeProvider/ThemeProvider";
import DarkModeBtn from "../DarkModeBtn/DarkModeBtn";
import GitHubIcon from "../GitHubIcon/GitHubIcon";
import YoutubeLogo from "../YoutubeLogo/YoutubeLogo";
import "./TopBar.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function TopBar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="topBar fixed-top" data-theme={theme}>
      <div className="d-flex justify-content-between align-items-center px-4 h-100">
        <Link
          className="d-flex align-items-center justify-content-center"
          to="/"
        >
          <YoutubeLogo />
        </Link>
        <div className="bottom d-flex align-items-center gap-3">
          <DarkModeBtn />
          <GitHubIcon />
        </div>
      </div>
    </div>
  );
}
