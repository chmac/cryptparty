import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import Bar from "../Bar";
import CreateEvent from "../CreateEvent";

const Routes: React.FC<Props> = (props: Props) => {
  const { classes } = props;

  return (
    <Router>
      <Bar />
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Route path="/" component={CreateEvent} />
        </Grid>
      </Grid>
    </Router>
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

export default withStyles(styles)(Routes);
