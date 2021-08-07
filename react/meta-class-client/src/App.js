import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClassPage from "./components/Class/ClassPage";
//import Auth from "./hoc/Auth";
// pages for this product
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";

class App extends React.Component {
  componentDidMount() {
    fetch("/api/hello")
      .then((response) => response.json())
      .then((message) => {
        this.setState({ message: message.message, url: message.url });
      });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/class/:className" component={ClassPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
