import React, { useEffect } from "react";
import { RouteComponentProps, Redirect } from "react-router";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";

import { AppState } from "../../store";
import { setIsOwner, loadInvite } from "./ViewInvite.state";

const ViewInvite: React.FC<Props> = (props: Props) => {
  const { match, classes, loadInvite } = props;
  const { key, action } = match.params;

  useEffect(() => {
    loadInvite(key);
  }, [loadInvite, key]);

  if (!!action && action === "o") {
    props.setIsOwner(true);
    // Remove the trailing `/o` part from the URL. This allows the event owner
    // to share this URL from their browser directly, and the recipient will not
    // see the "share this page" message.
    return <Redirect to={`/i/${key}`} />;
  }

  if (props.isLoading) {
    return <div>Loading</div>;
  }

  if (props.isError) {
    return (
      <div>
        <Typography variant="h2" color="error">
          Error
        </Typography>
        <Typography>{props.error}</Typography>
      </div>
    );
  }

  const showOwnerMesage = () => {
    return (
      <Modal open={true}>
        <div className={classes.modal}>
          <Paper className={classes.paper}>
            <Typography variant="h2">
              {props.invite.name}'s invitation
            </Typography>
            <Typography>
              This is {props.invite.name}'s invitation page. Send this page to{" "}
              {props.invite.name} so they can see the invitation.
            </Typography>
          </Paper>
        </div>
      </Modal>
    );
  };

  return (
    <>
      {props.isOwner ? showOwnerMesage() : null}
      <Typography variant="h2">Dear {props.invite.name}</Typography>
      <Paper className={classes.paper}>
        <ReactMarkdown source={props.invite.event.description} />
      </Paper>
    </>
  );
};

const mapStateToProps = (state: AppState) => {
  const { ViewInvite } = state;
  return ViewInvite;
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, {}, AnyAction>
) => {
  return {
    setIsOwner: (isOwner: boolean) => {
      dispatch(setIsOwner(isOwner));
    },
    loadInvite: (secretKey: string) => {
      dispatch(loadInvite(secretKey));
    }
  };
};

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      ...theme.mixins.gutters(),
      padding: theme.spacing(2, 0),
      margin: theme.spacing(2, 0)
    },
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
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
)(withStyles(styles)(ViewInvite));
