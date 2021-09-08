import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClassPage from "./components/Class/ClassPage";

import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";

class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={ LandingPage } />
            <Route exact path="/login" component={ LoginPage } />
            <Route exact path="/register" component={ RegisterPage } />
            <Route exact path="/class/:className" component={ ClassPage } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
