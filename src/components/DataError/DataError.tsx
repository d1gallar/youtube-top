import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider/ThemeProvider";
import "./DataError.css";

const PUBLIC_URL = process.env.PUBLIC_URL;

export default function DataError() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="left">
      <div
        className={`DataError error flex-center ${
          theme !== "light" ? "text-white" : "text-black"
        }`}
      >
        <img
          src={`${PUBLIC_URL}/images/youtube-error-icon.svg`}
          alt="Youtube Error"
        />
        <div className="DataError flex-center">
          <h3>Uh Oh! Something went wrong!</h3>
          <h4>Please try again later!</h4>
          <button className="error text-white" onClick={() => location.reload()}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
