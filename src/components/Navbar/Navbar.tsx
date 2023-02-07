import { useContext } from "react";
import NavItem from "../NavItem/NavItem";
import { ThemeContext } from "../../context/ThemeProvider/ThemeProvider";
import "bootstrap-icons/font/bootstrap-icons.css";

function Navbar() {
  const {theme} = useContext(ThemeContext);
  return (
    <nav className="content nav flex-column mb-auto pt-3">
      <NavItem
        link="/"
        iconClass="bi bi-bar-chart-fill"
        label="Most Popular"
      />
      <NavItem
        link="/channels"
        iconClass="bi bi-collection-play"
        label="Top Channels"
      />
    </nav>
  );
}

export default Navbar;
