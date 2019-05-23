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
import Grid from "@material-ui/core/Grid";
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
        <Typography>{content}</Typography>
        <Grid container className={classes.buttonGrid} spacing={2}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              color="default"
              onClick={() => {
                setPreview(false);
              }}
            >
              Edit Again
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              onClick={() => {
                createEvent();
              }}
            >
              Publish
            </Button>
          </Grid>
        </Grid>
      </>
    );
  };

  const showEditor = () => {
    return (
      <>
        <Typography>Enter the text in markdown</Typography>
        <Paper className={classes.paper}>
          <TextField
            id="content"
            label="Content"
            multiline
            rows="16"
            fullWidth
            onChange={event => setContent(event.target.value)}
            value={content}
          />
        </Paper>
        <Button
          variant="contained"
          fullWidth
          color="primary"
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
    <>
      <Typography variant="h2">Create an event</Typography>
      {isPreview ? showPreview() : showEditor()}
    </>
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
type Props = StateProps &
  DispatchProps &
  WithStyles<typeof styles> &
  RouteComponentProps;

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      ...theme.mixins.gutters(),
      margin: theme.spacing(2, 0)
    },
    buttonGrid: {
      ...theme.mixins.gutters()
    }
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateEvent));
