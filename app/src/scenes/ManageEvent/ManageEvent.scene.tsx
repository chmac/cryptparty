import React from "react";
import { RouteComponentProps, Redirect } from "react-router";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { AppState } from "../../store";
import { setIsOwner } from "./ManageEvent.state";

const ManageEvent: React.FC<Props> = (props: Props) => {
  const { match, classes, isOwner, setIsOwner } = props;
  const { key, action } = match.params;

  console.log("ManageEvent #T67oQd", props);

  if (!!action && action === "o") {
    debugger;
    setIsOwner(true);
    return <Redirect to={`/m/${key}`} />;
  }

  return (
    <Paper>
      <Typography variant="h2" className={classes.paper}>
        Name
      </Typography>
    </Paper>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    isOwner: state.ManageEvent.isOwner
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  return {
    setIsOwner: (isOwner: boolean) => {
      dispatch(setIsOwner(isOwner));
    }
  };
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
interface RouteParams {
  key: string;
  action: string;
}
type Props = StateProps &
  DispatchProps &
  WithStyles<typeof styles> &
  RouteComponentProps<RouteParams>;

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      ...theme.mixins.gutters(),
      margin: theme.spacing(2, 0)
    }
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ManageEvent));
