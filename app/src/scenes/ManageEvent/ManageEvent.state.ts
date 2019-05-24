import { Reducer, Action, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { AppState } from "../../store";
import { create } from "../../services/invites";
import { Event, getBySecretKey } from "../../services/events";
import history from "../../history";
import ViewInviteScene from "../ViewInvite";

const SET_IS_OWNER = "cryptparty/ManageEvent/SET_IS_OWNER";
export interface SetIsOwnerAction extends Action<typeof SET_IS_OWNER> {
  payload: {
    isOwner: boolean;
  };
}
export const setIsOwner = (isOwner: boolean): SetIsOwnerAction => ({
  type: SET_IS_OWNER,
  payload: {
    isOwner
  }
});

const LOAD_EVENT_ERROR = "cryptparty/ManageEvent/LOAD_EVENT_ERROR";
export interface LoadEventErrorAction extends Action<typeof LOAD_EVENT_ERROR> {
  payload: {
    error: string;
  };
}
const _loadEventError = (error: string): LoadEventErrorAction => ({
  type: LOAD_EVENT_ERROR,
  payload: {
    error
  }
});

const LOAD_EVENT = "cryptparty/ManageEvent/LOAD_EVENT";
export interface LoadEventAction extends Action<typeof LOAD_EVENT> {
  payload: {
    secretKey: string;
    event: Event;
  };
}
const _loadEvent = (secretKey: string, event: Event): LoadEventAction => ({
  type: LOAD_EVENT,
  payload: {
    secretKey,
    event
  }
});
export const loadEvent = (
  secretKey: string
): ThunkAction<void, AppState, {}, AnyAction> => async (dispatch, getState) => {
  const state = getState();
  if (!state.ManageEvent.isLoading) {
    return;
  }
  try {
    const event = await getBySecretKey(secretKey);
    dispatch(_loadEvent(secretKey, event));
  } catch (error) {
    dispatch(_loadEventError(error.message));
  }
};

export const createInvite = (): ThunkAction<void, AppState, {}, AnyAction> => (
  dispatch,
  getState
) => {
  const state = getState();
  // Ask the user for a name
  const name = prompt("Who do you want to invite?");
  if (name === null) {
    return;
  }
  // Create the invitation
  create(name, state.ManageEvent.event, state.ManageEvent.secreteKey).then(
    keys => {
      // Redirect to the new invitation URL
      history.push(`/i/${keys.secretKey}/o`);
    }
  );
};

export type Actions = SetIsOwnerAction | LoadEventErrorAction | LoadEventAction;

interface State {
  isOwner: boolean;
  isLoading: boolean;
  isError: boolean;
  error: string;
  secreteKey: string;
  event: Event;
}
const empty: State = {
  isOwner: false,
  isLoading: true,
  isError: false,
  error: "",
  secreteKey: "",
  event: {
    _id: "",
    description: "",
    invitees: []
  }
};
const reducer: Reducer<State, Actions> = (state = empty, action): State => {
  switch (action.type) {
    case SET_IS_OWNER: {
      return { ...state, isOwner: action.payload.isOwner };
    }
    case LOAD_EVENT: {
      return {
        ...state,
        isLoading: false,
        secreteKey: action.payload.secretKey,
        event: action.payload.event
      };
    }
    case LOAD_EVENT_ERROR: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload.error
      };
    }
  }
  return state;
};

export default reducer;
