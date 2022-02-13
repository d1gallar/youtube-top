import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import "../../App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../Navbar/Navbar";

class Sidebar extends React.Component {

  onThemeToggle = () => {
    this.props.toggleTheme();
  }

  renderLogo() {
    if(this.props.theme === 'light'){
      return (
        <img className="logo" src="/images/youtube-light.svg" alt="Youtube Logo" />
      )
    } else {
      return (
        <img className="logo" src="/images/youtube-dark.svg" alt="Youtube Logo" />
      )
    }
  }

  render() {
    const gitURL = "https://github.com/d1gallar/youtube-top";
    const {theme} = this.props;
    return (
      <div className='d-flex flex-column flex-shrink-0 sideBar' data-theme={`${theme}`}>
        <div className="top">
          <Link
            to="/"
            className="d-flex align-items-center justify-content-center"
          >
            {this.renderLogo()}
          </Link>
        </div>
        <Navbar theme={theme} />
        <div className="bottom d-flex align-items-center">
          <button onClick={this.onThemeToggle}>
            <i className="bi bi-moon-fill darkmode" data-theme={`${theme}`}></i>
          </button>
          <a href={`${gitURL}`} target="_blank" rel="noreferrer noopener">
            <i className="bi bi-github github" data-theme={`${theme}`}></i>
          </a>
        </div>
      </div>
    );
  }
}

export default Sidebar;
