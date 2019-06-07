import React, { useEffect } from "react";
import { RouteComponentProps, Redirect } from "react-router";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import ReactMarkdown from "react-markdown";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import { AppState } from "../../store";
import {
  setShowSaveMessage,
  loadEvent,
  createInvite
} from "./ManageEvent.state";
import { replyToString, Reply } from "../../services/replies";

const ManageEvent: React.FC<Props> = (props: Props) => {
  const { match, classes, loadEvent } = props;
  const { key, action } = match.params;

  useEffect(() => {
    loadEvent(key);
  }, [loadEvent, key]);

  if (!!action && action === "s") {
    props.setShowSaveMessage(true);
    // Remove the trailing `/o` part from the URL. This allows the event owner
    // to share this URL from their browser directly, and the recipient will not
    // see the "share this page" message.
    return <Redirect to={`/m/${key}`} />;
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

  const showSaveMesage = () => {
    return (
      <Modal open={true}>
        <div className={classes.modal}>
          <Paper className={classes.paper}>
            <Typography variant="h2">Save this link</Typography>
            <Typography className={classes.p}>
              This page (link) is the key to your event. There is no way to
              recover it.
            </Typography>{" "}
            <Typography className={classes.p}>
              We recommend saving it somewhere offline and secure. Signal
              messenger could be a great option!
            </Typography>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                props.setShowSaveMessage(false);
              }}
            >
              Done
            </Button>
          </Paper>
        </div>
      </Modal>
    );
  };

  const getInvitees = () => {
    if (!props.event.invitees || !props.event.invitees.length) {
      return (
        <ListItem>
          <ListItemText>Nobody so far...</ListItemText>
        </ListItem>
      );
    }
    return props.event.invitees.map(invitee => {
      const getClassName = () => {
        if (!invitee.reply) {
          return "noReply";
        }
        switch (invitee.reply.reply) {
          case Reply.YES: {
            return "yes";
            break;
          }
          case Reply.MAYBE: {
            return "maybe";
            break;
          }
          case Reply.NO: {
            return "no";
            break;
          }
        }
      };

      return (
        <ListItem key={invitee._id}>
          <ListItemText>
            {invitee.name} -{" "}
            <Box className={classes[getClassName()]} component="span">
              {!!invitee.reply
                ? `replied ${replyToString(invitee.reply.reply)}`
                : "no reply"}
            </Box>
          </ListItemText>
        </ListItem>
      );
    });
  };

  return (
    <>
      {props.showSaveMessage ? showSaveMesage() : null}
      <Typography className={classes.p}>
        This link is your event. If you lose this page there is no way to
        recover it.
      </Typography>
      <Typography className={classes.p}>
        To invite a new person, create an invitation link for them. Each person
        gets their own invitation.
      </Typography>
      <Grid container justify="flex-end">
        <Grid item xs={12}>
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            onClick={props.createInvite}
          >
            Create New Invite Link
          </Button>
        </Grid>
      </Grid>
      <Typography className={classes.heading} variant="h2">
        Already invited
      </Typography>
      <Paper className={classes.paper}>
        <Typography>
          You created invite links for the following people.
        </Typography>
        <List dense>{getInvitees()}</List>
      </Paper>
      <Typography className={classes.heading} variant="h2">
        Your event
      </Typography>
      <Paper className={classes.paper}>
        <ReactMarkdown source={props.event.description} />
      </Paper>
    </>
  );
};

const mapStateToProps = (state: AppState) => {
  const { ManageEvent } = state;
  return ManageEvent;
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, {}, AnyAction>
) => {
  return {
    setShowSaveMessage: (showSaveMesage: boolean) => {
      dispatch(setShowSaveMessage(showSaveMesage));
    },
    loadEvent: (secretKey: string) => {
      dispatch(loadEvent(secretKey));
    },
    createInvite: () => {
      dispatch(createInvite());
    }
  };
};

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      ...theme.mixins.gutters(),
      padding: theme.spacing(2),
      margin: theme.spacing(2, 0)
    },
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "80vw",
      maxWidth: "400px"
    },
    heading: {
      margin: theme.spacing(3, 0)
    },
    p: {
      margin: theme.spacing(1, 0)
    },
    yes: {
      color: "green"
    },
    maybe: {
      color: "orange"
    },
    no: {
      color: "red"
    },
    noReply: {
      color: "grey"
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
