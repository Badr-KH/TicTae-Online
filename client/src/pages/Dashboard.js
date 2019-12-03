import React, { Component } from "react";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {}
    };
  }
  componentDidMount() {
    fetch("/stats")
      .then(res => res.json())
      .then(res => {
        if (!res.error) this.setState({ stats: res });
      });
  }
  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <div className="main">
          <div>
            <h2>Welcome, {this.props.user.username}</h2>
            <h4>Here is how you are doing so far !</h4>
            <div className="stats">
              <div className="stat">
                <h6>Games Played</h6>
                <span>{this.state.stats.gamesPlayed}</span>
              </div>
              <div className="stat">
                <h6>Games Won</h6>
                <span>{this.state.stats.gamesWon}</span>
              </div>
              <div className="stat">
                <h6>Games Lost</h6>
                <span>{this.state.stats.gamesLost}</span>
              </div>
              <div className="stat">
                <h6>Average time per game !</h6>
                <span>{this.state.stats.averageGameDuration}</span>
              </div>
            </div>
          </div>
          <p>Ready to improve your score ? Play a game today !</p>
        </div>
      </div>
    );
  }
}

export default Dashboard;
