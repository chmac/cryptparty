import React from "react";
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";

import store from "./store";
import apollo from "./apollo";

import { createInvitation } from "./services/invitations";

import logo from "./logo.svg";
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={apollo}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <button onClick={createInvitation}>Create Invitation</button>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </ApolloProvider>
    </Provider>
  );
};

export default App;
