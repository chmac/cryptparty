import React from "react";
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core";

import store from "./store";
import apollo from "./apollo";

import Events from "./scenes/Events";

import { createInvitation } from "./services/invitations";

import "./App.css";

const App = (props: WithStyles<typeof styles>) => {
  const { classes } = props;

  return (
    <Provider store={store}>
      <ApolloProvider client={apollo}>
        <Events />
        <div id="App" className={classes.root}>
          <button onClick={createInvitation}>Create Invitation</button>
        </div>
      </ApolloProvider>
    </Provider>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

export default withStyles(styles)(App);
