import React from "react";
import NavItem from "../NavItem/NavItem";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = (props) => {
  const {theme} = props;
  return (
    <nav className="content nav flex-column mb-auto pt-3">
      <NavItem link="/" iconClass="bi bi-bar-chart-fill" label="Most Popular" theme={theme}/>
      <NavItem
        link="/channels"
        iconClass="bi bi-collection-play"
        label="Top Channels"
        theme={theme}
      />
      <NavItem
        link="/broadcasts"
        iconClass="bi bi-broadcast"
        label="Top Broadcasts"
        theme={theme}
      />
    </nav>
  );
};

export default Navbar;
