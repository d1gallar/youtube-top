import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeProvider/ThemeProvider";
import "./NavItem.css";
import "../App/App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

type NavItemProps = {
  link: string;
  iconClass: string;
  label: string;
  horizontal?: boolean;
};

function NavItem(props: NavItemProps) {
  const { horizontal, link, iconClass, label } = props;
  const {theme} = useContext(ThemeContext);

  return horizontal ? (
    <NavLink
      to={`${link}`}
      aria-current="page"
      className="horizontal menuItem"
      data-theme={theme}
    >
      <i className={`${iconClass} horizontal icon`} data-theme={theme}></i>
      <p>{label}</p>
    </NavLink>
  ) : (
    <NavLink
      to={`${link}`}
      aria-current="page"
      className="menuItem justify-content-start"
      data-theme={theme}
    >
      <i className={`${iconClass} icon`} data-theme={theme}></i>
      {label}
    </NavLink>
  );
}

export default NavItem;
