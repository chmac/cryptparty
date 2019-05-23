import { Reducer, Action } from "redux";
import { ThunkAction } from "redux-thunk";

import history from "../../history";
import { create } from "../../services/events";
import { AppState } from "../../store";

const SET_DESCRIPTION = "cryptparty/Events/SET_DESCRIPTION";
export interface SetContentAction extends Action<typeof SET_DESCRIPTION> {
  payload: {
    description: string;
  };
}
export const setContent = (description: string): SetContentAction => ({
  type: SET_DESCRIPTION,
  payload: {
    description
  }
});

const CREATE_EVENT = "cryptparty/Events/CREATE_EVENT";
export interface CreateEventAction extends Action<typeof CREATE_EVENT> {
  payload: {};
}
export const createEvent = (): ThunkAction<
  void,
  AppState,
  {},
  CreateEventAction
> => (dispatch, getState) => {
  const state = getState();
  const { description } = state.CreateEvent.event;

  create({ description }).then(keys => {
    history.push(`/m/${keys.secretKey}/o`);
  });
};

export type Actions = SetContentAction | CreateEventAction;

interface EventsState {
  event: {
    description: string;
  };
}
const empty: EventsState = {
  event: {
    description: ""
  }
};

const reducer: Reducer<EventsState, Actions> = (
  state = empty,
  action
): EventsState => {
  switch (action.type) {
    // case CREATE_EVENT: {
    //   return state;
    // }
    case SET_DESCRIPTION: {
      const { description } = action.payload;
      return { ...state, event: { description } };
    }
  }

  return state;
};

export default reducer;
