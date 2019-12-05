import React, { Component } from "react";
import "../styles/dashboard.css";
class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreArray: [],
      noResult: "",
      page: 1,
      lastDocument: ""
    };
  }
  componentDidMount() {
    fetch(`/profile/leaderboard`)
      .then(res => res.json())
      .then(res =>
        this.setState({
          scoreArray: res.result,
          noResult: res.result.length > 0 || "No result found",
          moreData: res.anotherPage,
          lastDocument: res.lastId
        })
      );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page < this.state.page) {
      fetch(`/profile/leaderboard?score=${this.state.lastDocument}`)
        .then(res => res.json())
        .then(res =>
          this.setState({
            scoreArray: [...prevState.scoreArray, ...res.result],
            moreData: res.anotherPage,
            lastDocument: res.lastId
          })
        );
    }
  }
  render() {
    return (
      <div className="main">
        <h4>Leaderboard :</h4>
        {this.state.scoreArray.length > 0 ? (
          <table border="1">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {this.state.scoreArray.map((user, i) => (
                <tr key={user.stats._id}>
                  <td>{i + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.stats.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          this.state.noResult
        )}{" "}
        {this.state.moreData && (
          <h3 style={{ textAlign: "center", marginTop: "30px" }}>
            <button
              type="button"
              className="buttonlink"
              onClick={() => this.setState({ page: this.state.page + 1 })}
            >
              Load more !
            </button>
          </h3>
        )}
      </div>
    );
  }
}

export default LeaderBoard;
