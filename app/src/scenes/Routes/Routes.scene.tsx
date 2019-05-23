import React from "react";
import { Router, Route } from "react-router-dom";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import history from "../../history";
import Bar from "../Bar";
import CreateEvent from "../CreateEvent";

const Routes: React.FC<Props> = (props: Props) => {
  const { classes } = props;

  return (
    <Router history={history}>
      <CssBaseline />
      <Bar />
      <Container className={classes.container}>
        <Route path="/" component={CreateEvent} />
      </Container>
    </Router>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    container: {
      flexGrow: 1
    }
  });

type Props = WithStyles;

export default withStyles(styles)(Routes);
