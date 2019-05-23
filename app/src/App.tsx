import React from "react";
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";

import store from "./store";
import apollo from "./apollo";

import Routes from "./scenes/Routes";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={apollo}>
        <Routes />
      </ApolloProvider>
    </Provider>
  );
};

export default App;
