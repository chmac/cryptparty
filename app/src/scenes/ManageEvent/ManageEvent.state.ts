import { Reducer, Dispatch, Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { AppState } from "../../store";
import { getBySecretKey } from "../../services/events";

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

const LOAD_EVENT = "cryptparty/ManageEvent/LOAD_EVENT";
export interface LoadEventAction extends Action<typeof LOAD_EVENT> {
  payload: {
    secretKey: string;
    event: string;
  };
}
const _loadEvent = (secretKey: string, event: string): LoadEventAction => ({
  type: LOAD_EVENT,
  payload: {
    secretKey,
    event
  }
});
export const loadEvent = (
  secretKey: string
): ThunkAction<void, AppState, {}, LoadEventAction> => (dispatch, getState) => {
  const state = getState();

  getBySecretKey(secretKey).then(event => {
    dispatch(_loadEvent(secretKey, event));
  });
};

export type Actions = SetIsOwnerAction | LoadEventAction;

interface State {
  isOwner: boolean;
  isLoading: boolean;
  content: string;
}
const empty: State = {
  isOwner: false,
  isLoading: true,
  content: ""
};
const reducer: Reducer<State, Actions> = (state = empty, action): State => {
  switch (action.type) {
    case SET_IS_OWNER: {
      return { ...state, isOwner: action.payload.isOwner };
    }
    case LOAD_EVENT: {
      return { ...state, isLoading: false, content: action.payload.event };
    }
  }
  return state;
};

export default reducer;
