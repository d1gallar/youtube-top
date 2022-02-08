import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import MenuList from "../MenuList/MenuList";
import "./SideBar.css";
import sideBarLogo from "../../images/youtube-logo-sidebar.svg";

class Sidebar extends React.Component {
  render() {
    return (
      <div className="d-flex flex-column flex-shrink-0 sideBar">
        <div className="top">
          <a
            href="/"
            className="d-flex align-items-center justify-content-center mb-md-0 me-md-auto link-dark text-decoration-none"
          >
            {/* <i className="bi bi-list list"></i> */}
            <img className="logo" src={sideBarLogo} alt="Youtube Logo" />
          </a>
        </div>

        <ul className="content nav flex-column mb-auto pt-3">
          <MenuList
            link="#"
            iconClass="bi bi-house-door-fill"
            label="Home"
            isActive={true}
          />
          <MenuList
            link="#"
            iconClass="bi bi-bar-chart-fill"
            label="Trending Now"
            isActive={false}
          />
        </ul>
        <div className="bottom d-flex align-items-center">
            <a href="X">
              <i className="bi bi-moon-fill darkmode"></i>
            </a>
            <a href="X">
              <i className="bi bi-github github"></i>
            </a>
        </div>
      </div>
    );
  }
}

export default Sidebar;
