import React from "react";
import Auth from "./pages/Authenticated";
import Dashboard from "./pages/Dashboard";
import Play from "./pages/Play";
import GameHistory from "./pages/GameHistory";
import LeaderBoard from "./pages/Leaderboard";
import { BrowserRouter, Switch } from "react-router-dom";
import auth from "./utils/isAuthenticated";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authLoad: null
    };
  }
  componentDidMount() {
    auth.authenticate().then(() => this.setState({ authLoad: true }));
  }
  render() {
    return (
      <BrowserRouter>
        {this.state.authLoad && (
          <Switch>
            <Auth exact path="/profile" component={Dashboard} />
            <Auth exact path="/" component={Dashboard} />
            <Auth exact path="/play" component={Play} />
            <Auth exact path="/history" component={GameHistory} />
            <Auth exact path="/leaderboard" component={LeaderBoard} />
          </Switch>
        )}
      </BrowserRouter>
    );
  }
}

export default App;
