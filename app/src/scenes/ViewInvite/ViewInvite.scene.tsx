import React, { useEffect } from "react";
import { RouteComponentProps, Redirect } from "react-router";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

import { AppState } from "../../store";
import { setIsOwner, loadInvite, sendReply } from "./ViewInvite.state";
import { replyToString, Reply } from "../../services/replies";

const ViewInvite: React.FC<Props> = (props: Props) => {
  const { match, classes, loadInvite } = props;
  const { key, action } = match.params;

  useEffect(() => {
    console.log("ViewInvite.scene useEffect #vXShRN");
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
            <Typography className={classes.p}>
              This is {props.invite.name}'s invitation link. Send this link to{" "}
              {props.invite.name}.
            </Typography>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                window.history.back();
              }}
            >
              Back to my event
            </Button>
          </Paper>
        </div>
      </Modal>
    );
  };

  const showReplyStatus = () => {
    if (props.invite.reply === undefined) {
      return (
        <Typography className={classes.pBottom}>
          You have not yet replied.
        </Typography>
      );
    }

    return (
      <Typography className={classes.pBottom}>
        You have replied: {replyToString(props.invite.reply)}
      </Typography>
    );
  };

  const showReplyButtons = () => {
    return (
      <>
        <Typography className={classes.pBottom}>
          {props.invite.reply !== undefined
            ? "Update your reply"
            : "Are you coming?"}
        </Typography>
        <Grid container className={classes.buttonGrid} spacing={2}>
          <Grid item xs={4}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={() => {
                props.sendRepy(Reply.NO);
              }}
            >
              No
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              fullWidth
              color="default"
              onClick={() => {
                props.sendRepy(Reply.MAYBE);
              }}
            >
              Maybe
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              onClick={() => {
                props.sendRepy(Reply.YES);
              }}
            >
              Yes
            </Button>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      {props.isOwner ? showOwnerMesage() : null}
      <Typography variant="h2">{props.invite.name}</Typography>
      <Paper className={classes.paper}>
        <ReactMarkdown source={props.invite.event.description} />
      </Paper>
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        {showReplyStatus()}
        {showReplyButtons()}
      </AppBar>
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
    },
    sendRepy: (reply: Reply) => {
      dispatch(sendReply(reply));
    }
  };
};

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      ...theme.mixins.gutters(),
      padding: theme.spacing(2),
      margin: theme.spacing(2, 0),
      marginBottom: theme.spacing(18)
    },
    appBar: {
      ...theme.mixins.gutters(),
      top: "auto",
      bottom: 0
    },
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80vw",
      maxWidth: "400px"
    },
    p: {
      margin: theme.spacing(2, 0)
    },
    pBottom: {
      marginTop: theme.spacing(1)
    },
    buttonGrid: {
      ...theme.mixins.gutters(),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
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
