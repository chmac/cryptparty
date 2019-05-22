import React from "react";
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import store from "./store";
import apollo from "./apollo";

import Bar from "./scenes/Bar";
import Events from "./scenes/Events";

import { createInvitation } from "./services/invitations";

import "./App.css";

const App: React.FC<Props> = (props: WithStyles<typeof styles>) => {
  const { classes } = props;

  return (
    <Provider store={store}>
      <ApolloProvider client={apollo}>
        <Bar />
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Events />
            <button onClick={createInvitation}>Create Invitation</button>
          </Grid>
        </Grid>
      </ApolloProvider>
    </Provider>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      ...theme.mixins.gutters(),
      flexGrow: 1
    }
  });

type Props = WithStyles;

export default withStyles(styles)(App);
