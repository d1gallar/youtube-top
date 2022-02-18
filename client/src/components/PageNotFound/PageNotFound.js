import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

class PageError extends React.Component {
  render() {
    const { theme } = this.props;
    return (
      <div className="left">
        <div className="PageError error" datetheme={theme}>
          <h1>404 Error: Not Found!</h1>
          <h3>Uh Oh! This page isn't available on this server.</h3>
          <Link to="/">Go Home</Link>
        </div>
      </div>
    );
  }
}

export default PageError;
