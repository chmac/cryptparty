import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core";

import { setContent, createEvent } from "./Events.reducer";
import { AppState } from "../../store";
import { AnyAction } from "redux";

const Events: React.FC<Props> = (props: Props) => {
  const { classes, setContent, createEvent } = props;

  return (
    <div className={classes.root}>
      <h1>Create an event</h1>
      <div>
        <p>Enter the text in markdown</p>
        <p>
          <textarea onChange={event => setContent(event.target.value)} />
        </p>
        <p>
          <button onClick={createEvent}>Create Event</button>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    foo: state.Events.content
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
type Props = StateProps & DispatchProps & WithStyles;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Events));
