import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
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
import Button from "@material-ui/core/Button";

import { AppState } from "../../store";
import { setIsOwner, loadEvent, createInvite } from "./ManageEvent.state";
import { replyToString } from "../../services/replies";

const ManageEvent: React.FC<Props> = (props: Props) => {
  const { match, classes, loadEvent } = props;
  const { key } = match.params;

  useEffect(() => {
    loadEvent(key);
  }, [loadEvent, key]);

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

  const getInvitees = () => {
    if (!props.event.invitees || !props.event.invitees.length) {
      return (
        <ListItem>
          <ListItemText>Nobody so far...</ListItemText>
        </ListItem>
      );
    }
    return props.event.invitees.map(invitee => {
      return (
        <ListItem key={invitee._id}>
          <ListItemText>
            {invitee.name} -{" "}
            {!!invitee.reply
              ? `replied ${replyToString(invitee.reply.reply)}`
              : "no reply"}
          </ListItemText>
        </ListItem>
      );
    });
  };

  return (
    <>
      <Typography className={classes.p} color="secondary">
        Save this link.
      </Typography>
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
    setIsOwner: (isOwner: boolean) => {
      dispatch(setIsOwner(isOwner));
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
    heading: {
      margin: theme.spacing(3, 0)
    },
    p: {
      margin: theme.spacing(1, 0)
    }
  });

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
interface RouteParams {
  key: string;
}
type Props = StateProps &
  DispatchProps &
  WithStyles<typeof styles> &
  RouteComponentProps<RouteParams>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ManageEvent));
