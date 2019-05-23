import React, { useEffect } from "react";
import { RouteComponentProps, Redirect } from "react-router";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { AppState } from "../../store";
import { setIsOwner, loadEvent } from "./ManageEvent.state";

const ManageEvent: React.FC<Props> = (props: Props) => {
  const { match, classes, isOwner, setIsOwner, isLoading, loadEvent } = props;
  const { key, action } = match.params;

  useEffect(() => {
    loadEvent(key);
    // Do something to fetch data
    console.log("ManageEvent.useEffect #Pmskns");
    return () => {
      // Do something to clean up
      console.log("ManageEvent.useEffect cleanup #Pmskns");
    };
  });

  if (!!action && action === "o") {
    setIsOwner(true);
    return <Redirect to={`/m/${key}`} />;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <Paper>
      <Typography className={classes.paper}>{props.content}</Typography>
    </Paper>
  );
};

const mapStateToProps = (state: AppState) => {
  const { ManageEvent } = state;
  return ManageEvent;
  //   return {
  //     isOwner: state.ManageEvent.isOwner,
  //     isLoading: state.ManageEvent.isLoading,
  //     content: state.ManageEvent.content
  //   };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, {}, AnyAction>
) => {
  return {
    setIsOwner: (isOwner: boolean) => {
      dispatch(setIsOwner(isOwner));
    },
    loadEvent: (secretKey: string) => {
      dispatch(loadEvent(secretKey));
    }
  };
};

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      ...theme.mixins.gutters(),
      margin: theme.spacing(2, 0)
    }
  });

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ManageEvent));
