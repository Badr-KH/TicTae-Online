import React from "react";
import Auth from "./pages/Authenticated";
import Dashboard from "./pages/Dashboard";
import Play from "./pages/Play";
import { BrowserRouter, Switch } from "react-router-dom";
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Auth exact path="/profile" component={Dashboard} />
          <Auth exact path="/" component={Dashboard} />
          <Auth exact path="/play" component={Play} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
