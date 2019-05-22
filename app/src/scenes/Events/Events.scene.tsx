import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

import { setContent, createEvent } from "./Events.reducer";
import { AppState } from "../../store";
import { AnyAction } from "redux";

const Events: React.FC<Props> = (props: Props) => {
  const { setContent, createEvent } = props;

  return (
    <div>
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
type Props = StateProps & DispatchProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
