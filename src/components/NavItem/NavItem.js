import React from "react";
import "./NavItem.css";
import '../../App.css';
import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

class NavItem extends React.Component{
  render() {
    const { link, iconClass, label, theme } = this.props;
    return (
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
}

export default NavItem;
