import React from "react";
import "../styles/dashboard.css";
class GameHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gamesPlayed: [],
      noResult: "",
      page: 1,
      lastDocument: ""
    };
  }
  componentDidMount() {
    fetch("/profile/history")
      .then(res => res.json())
      .then(res =>
        this.setState({
          gamesPlayed: res.result,
          noResult: res.result.length > 0 || "No result found !",
          moreData: res.anotherPage,
          lastDocument: res.lastId
        })
      );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page < this.state.page) {
      fetch(`/profile/history?id=${this.state.lastDocument}`)
        .then(res => res.json())
        .then(res =>
          this.setState({
            gamesPlayed: [...prevState.gamesPlayed, ...res.result],
            moreData: res.anotherPage,
            lastDocument: res.lastId
          })
        );
    }
  }
  render() {
    return (
      <div className="main">
        <h4>Game history :</h4>
        {this.state.gamesPlayed.length > 0 ? (
          <table border="1">
            <thead>
              <tr>
                <th>Opponent</th>
                <th>Result</th>
                <th>Game Duration</th>
                <th>Date Played</th>
              </tr>
            </thead>
            <tbody>
              {this.state.gamesPlayed.map(game => (
                <tr key={game._id}>
                  <td>{game.players[0].username}</td>
                  <td>
                    {game.winner ? (
                      game.winner === this.props.user._id ? (
                        <b style={{ color: "green" }}>Won</b>
                      ) : (
                        <b style={{ color: "red" }}>Lost</b>
                      )
                    ) : (
                      "Draw"
                    )}
                  </td>
                  <td>
                    {Math.round((game.gameDuration / 60000) * 10) / 10} min(s)
                  </td>
                  <td>{new Date(game.datePlayed).toLocaleString()}</td>
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

export default GameHistory;
