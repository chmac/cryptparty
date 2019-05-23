import React from "react";
import { Router, Route } from "react-router-dom";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import history from "../../history";
import Bar from "../Bar";
import CreateEvent from "../CreateEvent";
import ManageEvent from "../ManageEvent";

const Routes: React.FC<Props> = (props: Props) => {
  const { classes } = props;

  return (
    <Router history={history}>
      <CssBaseline />
      <Bar />
      <Container className={classes.container}>
        <Route exact path="/" component={CreateEvent} />
        <Route path="/m/:key/:action?" component={ManageEvent} />
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

type Props = WithStyles<typeof styles>;

export default withStyles(styles)(Routes);
