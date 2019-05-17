import { Reducer, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

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

const CREATE_EVENT = "cryptparty/Events/CREATE_EVENT";
export interface CreateEventAction {
  type: "cryptparty/Events/CREATE_EVENT";
  payload: {};
}
export const createEvent = (): ThunkAction<void, {}, {}, CreateEventAction> => (
  dispatch: Dispatch
) => {
  dispatch({
    type: CREATE_EVENT,
    payload: {}
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
