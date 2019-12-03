import React, { Component } from "react";
import "../styles/navbar.css";
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
            <a href="/play" className="nav-item nav-link">
              Play a game !
            </a>
            <a href="/" className="nav-item nav-link">
              Profile
            </a>
            <a href="/" className="nav-item nav-link">
              Game History
            </a>
            <a href="/" className="nav-item nav-link">
              Leaderboard
            </a>
            <a href="/" className="nav-item nav-link">
              Log-out !
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
