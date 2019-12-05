import React, { Component } from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";
class Footer extends Component {
  render() {
    return (
      <footer>
        <ul>
          <li>
            <span>&copy; Tic-Tae online ! </span>
          </li>
          <li>
            <Link to="/privacy">Privacy Policy</Link>
          </li>
        </ul>
      </footer>
    );
  }
}

export default Footer;
