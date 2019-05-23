import React, { useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import {
  withStyles,
  WithStyles,
  TextField,
  Theme,
  createStyles
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { setContent, createEvent } from "./CreateEvent.state";
import { AppState } from "../../store";
import { AnyAction } from "redux";
import { RouteComponentProps } from "react-router";

const CreateEvent: React.FC<Props> = (props: Props) => {
  const { classes, content, setContent, createEvent } = props;

  const [isPreview, setPreview] = useState(false);

  const showPreview = () => {
    return (
      <>
        <Typography variant="body2">{content}</Typography>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          onClick={() => {
            setPreview(false);
          }}
        >
          Edit Again
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => {
            createEvent();
          }}
        >
          Publish
        </Button>
      </>
    );
  };

  const showEditor = () => {
    return (
      <>
        <Typography variant="body2">Enter the text in markdown</Typography>
        <TextField
          id="content"
          label="Content"
          multiline
          rows="16"
          fullWidth
          onChange={event => setContent(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            setPreview(true);
          }}
        >
          Preview
        </Button>
      </>
    );
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h6">Create an event</Typography>
        {isPreview ? showPreview() : showEditor()}
      </Paper>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    content: state.CreateEvent.content
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  return {
    setContent: (content: string) => {
      dispatch(setContent(content));
    },
    createEvent: () => {
      dispatch(createEvent());
    }
  };
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps & WithStyles & RouteComponentProps;

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      ...theme.mixins.gutters(),
      marginTop: theme.spacing.unit * 2
    },
    button: {
      margin: theme.spacing.unit
    }
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateEvent));
