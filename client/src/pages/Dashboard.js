import React, { Component } from "react";
import "../styles/dashboard.css";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: null
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
        <div className="main">
          <div>
            <h2>Welcome, {this.props.user.username}</h2>
            <h4>Here is how you are doing so far !</h4>
            {this.state.stats && (
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
                  <h6>Draws</h6>
                  <span>{this.state.stats.draws}</span>
                </div>
                <div className="stat">
                  <h6>Ratio (W/D/L)</h6>
                  <span>
                    {this.state.stats.gamesPlayed > 0
                      ? `${Math.round(
                          (this.state.stats.gamesWon /
                            this.state.stats.gamesPlayed) *
                            100
                        )}
                    % |
                    ${Math.round(
                      (this.state.stats.draws / this.state.stats.gamesPlayed) *
                        100
                    )}
                    % |
                    ${Math.round(
                      (this.state.stats.gamesLost /
                        this.state.stats.gamesPlayed) *
                        100
                    )}
                    % `
                      : "Unavailable"}
                  </span>
                </div>
              </div>
            )}
          </div>
          <p>Ready to improve your score ? Play a game now !</p>
        </div>
      </div>
    );
  }
}

export default Dashboard;
