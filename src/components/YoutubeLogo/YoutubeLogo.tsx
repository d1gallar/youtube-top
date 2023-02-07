import { useContext } from "react";
import { Theme, ThemeContext } from "../../context/ThemeProvider/ThemeProvider";

export default function YoutubeLogo() {
  const { theme } = useContext(ThemeContext);
  return theme === ("dark" as Theme) ? (
    <img className="logo" src="/images/youtube-dark.svg" alt="Youtube Logo" />
  ) : (
    <img className="logo" src="/images/youtube-light.svg" alt="Youtube Logo" />
  );
}
