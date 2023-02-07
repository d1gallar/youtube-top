import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeProvider/ThemeProvider";
import Navbar from "../Navbar/Navbar";
import DarkModeBtn from "../DarkModeBtn/DarkModeBtn";
import GitHubIcon from "../GitHubIcon/GitHubIcon";
import YoutubeLogo from "../YoutubeLogo/YoutubeLogo";
import "../App/App.css";
import "./SideBar.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Sidebar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      className="d-flex flex-column flex-shrink-0 sideBar"
      id="sidebar"
      data-theme={theme}
    >
      <div className="top">
        <Link
          to="/"
          className="d-flex align-items-center justify-content-center"
        >
          <YoutubeLogo />
        </Link>
      </div>
      <Navbar />
      <div className="bottom d-flex align-items-center gap-3">
        <DarkModeBtn />
        <GitHubIcon />
      </div>
    </div>
  );
}

export default Sidebar;
