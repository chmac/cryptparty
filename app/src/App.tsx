import React from "react";
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";

import store from "./store";
import apollo from "./apollo";

import Events from "./scenes/Events";

import { createInvitation } from "./services/invitations";

import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={apollo}>
        <Events />
        <div className="App">
          <button onClick={createInvitation}>Create Invitation</button>
        </div>
      </ApolloProvider>
    </Provider>
  );
};

export default App;
