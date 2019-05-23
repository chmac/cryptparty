import { Reducer, Action, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { AppState } from "../../store";
import { Event, getBySecretKey } from "../../services/events";

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
  try {
    const event = await getBySecretKey(secretKey);
    dispatch(_loadEvent(secretKey, event));
  } catch (error) {
    dispatch(_loadEventError(error.message));
  }
};

export type Actions = SetIsOwnerAction | LoadEventErrorAction | LoadEventAction;

interface State {
  isOwner: boolean;
  isLoading: boolean;
  description: string;
  isError: boolean;
  error: string;
}
const empty: State = {
  isOwner: false,
  isLoading: true,
  description: "",
  isError: false,
  error: ""
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
        description: action.payload.event.description
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
