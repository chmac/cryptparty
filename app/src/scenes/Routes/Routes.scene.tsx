import React from "react";
import { Router, Route } from "react-router-dom";
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme,
  createMuiTheme
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import history from "../../history";
import Bar from "../Bar";
import CreateEvent from "../CreateEvent";
import ManageEvent from "../ManageEvent";
import ViewInvite from "../ViewInvite";
import { responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const baseTheme = createMuiTheme();
const theme = responsiveFontSizes(baseTheme);

const Routes: React.FC<Props> = (props: Props) => {
  const { classes } = props;

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <CssBaseline />
        <Bar />
        <Container className={classes.container}>
          <Route exact path="/" component={CreateEvent} />
          <Route path="/m/:key/:action?" component={ManageEvent} />
          <Route path="/i/:key/:action?" component={ViewInvite} />
        </Container>
      </Router>
    </ThemeProvider>
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
