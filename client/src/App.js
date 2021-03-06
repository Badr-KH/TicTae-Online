import React from "react";
import Auth from "./pages/Authenticated";
import Dashboard from "./pages/Dashboard";
import Play from "./pages/Play";
import GameHistory from "./pages/GameHistory";
import LeaderBoard from "./pages/Leaderboard";
import { BrowserRouter, Switch } from "react-router-dom";
import auth from "./utils/isAuthenticated";
import Privacy from "./pages/Privacy";
import nf404 from "./pages/404";
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
            <Auth exact path="/privacy" component={Privacy} />
            <Auth exact path="*" component={nf404} />
          </Switch>
        )}
      </BrowserRouter>
    );
  }
}

export default App;
