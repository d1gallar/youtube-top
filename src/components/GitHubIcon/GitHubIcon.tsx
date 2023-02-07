import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider/ThemeProvider";
import "./GitHubIcon.css";

const GIT_URL = "https://github.com/d1gallar/youtube-top";

export default function GitHubIcon() {
  const { theme } = useContext(ThemeContext);
  return (
    <a
      href={GIT_URL}
      className={`${theme !== "dark" ? "text-black" : "text-white"}`}
      target="_blank"
      rel="noreferrer noopener"
    >
      <i className="bi bi-github github"></i>
    </a>
  );
}
