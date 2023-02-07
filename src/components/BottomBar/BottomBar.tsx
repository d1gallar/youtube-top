import { useContext } from "react";
import NavItem from "../NavItem/NavItem";
import { ThemeContext } from "../../context/ThemeProvider/ThemeProvider";
import "./BottomBar.css";

export default function BottomBar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <footer id="bottomBar" className="bottomBarContainer" data-theme={theme}>
      <div className="d-flex flex-col h-100 w-100">
        <NavItem
          horizontal={true}
          link="/"
          iconClass="bi bi-bar-chart-fill"
          label="Most Popular"
        />
        <NavItem
          horizontal={true}
          link="/channels"
          iconClass="bi bi-collection-play"
          label="Top Channels"
        />
      </div>
    </footer>
  );
}
