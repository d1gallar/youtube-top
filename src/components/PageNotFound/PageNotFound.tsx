import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeProvider/ThemeProvider";
import "./PageNotFound.css";

const PUBLIC_URL = process.env.PUBLIC_URL;

function PageError() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="left">
      <div
        className={`PageError error flex-center ${
          theme !== "light" ? "text-white" : "text-black"
        }`}
        date-theme={theme}
      >
        <img
          src={`${PUBLIC_URL}/images/youtube-error-icon.svg`}
          alt="Youtube Error"
        />
        <h1>404 Error: Not Found!</h1>
        <h3>Uh Oh! This page isn't available on this server.</h3>
        <Link to="/" className="text-white">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default PageError;
