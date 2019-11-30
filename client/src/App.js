import React from "react";
import Authentication from "./pages/Authentication";
import { Route, BrowserRouter } from "react-router-dom";
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={Authentication} />
      </BrowserRouter>
    );
  }
}

export default App;
