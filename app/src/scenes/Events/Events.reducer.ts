import { Reducer, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { gql } from "apollo-boost";

import apollo from "../../apollo";

const SET_CONTENT = "cryptparty/Events/SET_CONTENT";
export interface SetContentAction {
  type: "cryptparty/Events/SET_CONTENT";
  payload: {
    content: string;
  };
}
export const setContent = (content: string): SetContentAction => ({
  type: SET_CONTENT,
  payload: {
    content
  }
});

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($_id: ID!, $content: String!) {
    createEvent(_id: $_id, content: $content) {
      success
    }
  }
`;

const CREATE_EVENT = "cryptparty/Events/CREATE_EVENT";
export interface CreateEventAction {
  type: "cryptparty/Events/CREATE_EVENT";
  payload: {};
}
export const createEvent = (): ThunkAction<void, {}, {}, CreateEventAction> => (
  dispatch: Dispatch,
  getState: () => any
) => {
  const state = getState();
  const { content } = state.Events;

  debugger;
  apollo
    .mutate({
      mutation: CREATE_EVENT_MUTATION,
      variables: {
        _id: "abc999",
        content
      }
    })
    .then(result => {
      debugger;

      dispatch({
        type: CREATE_EVENT,
        payload: {}
      });
    });
};

interface EventsState {
  content: string;
}
const empty: EventsState = {
  content: ""
};

const reducer: Reducer = (state: EventsState = empty, action) => {
  const { type, payload } = action;

  if (type === SET_CONTENT) {
    const { content } = payload;
    return { content };
  }

  return state;
};

export default reducer;
