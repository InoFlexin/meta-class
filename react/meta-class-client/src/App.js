import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

    constructor() {
      super();

      this.state = {
        message: "default message",
        url: "https://github.com"
      };
    }

    componentDidMount() {
      fetch('/api/hello')
        .then(response => response.json())
        .then(message => {
          this.setState( { message: message.message, url: message.url } );
        });
    }

    render() {
      return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <h1 className="App-title">{ this.state.message }</h1>
              <a href={ this.state.url }>{ this.state.url }</a>
            </header>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>
      )
    }
}

export default App;
