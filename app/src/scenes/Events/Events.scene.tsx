import React from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

import { setContent, createEvent } from "./Events.reducer";

interface State {}
interface OwnProps {}

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

interface StateProps {}

const mapStateToProps = (state: object) => {
  return {};
};

interface DispatchProps {
  setContent: (content: string) => void;
  createEvent: () => void;
}

type Props = StateProps & OwnProps & DispatchProps;

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => {
  return {
    setContent: (content: string) => {
      dispatch(setContent(content));
    },
    createEvent: () => {
      dispatch(createEvent());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
