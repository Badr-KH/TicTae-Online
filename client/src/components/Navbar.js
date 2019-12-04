import React, { Component } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Tic Tae Online !
        </a>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav">
            <Link to="/play" className="nav-item nav-link">
              Play a game
            </Link>
            <Link to="/history" className="nav-item nav-link">
              Game History
            </Link>
            <Link to="/leaderboard" className="nav-item nav-link">
              Leaderboard
            </Link>
            <Link
              to="/logout"
              className="nav-item nav-link"
              onClick={e => {
                e.preventDefault();
                fetch(`/logout`).then(() => this.props.callBack(true));
              }}
            >
              Log-out !
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
