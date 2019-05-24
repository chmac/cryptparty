import { Action, Reducer, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { Invite, getBySecretKey } from "../../services/invites";
import { AppState } from "../../store";
import { stat } from "fs";

const SET_IS_OWNER = "cryptparty/ViewInvite/SET_IS_OWNER";
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

const LOAD_INVITE = "cryptparty/ViewInvite/LOAD_INVITE";
export interface LoadInviteAction extends Action<typeof LOAD_INVITE> {
  payload: {
    invite: Invite;
  };
}
const _loadInvite = (invite: Invite): LoadInviteAction => ({
  type: LOAD_INVITE,
  payload: {
    invite
  }
});
export const loadInvite = (
  secretKey: string
): ThunkAction<void, AppState, {}, AnyAction> => async (dispatch, getState) => {
  getBySecretKey(secretKey).then(invite => {
    dispatch(_loadInvite(invite));
  });
  // do something
};

type Actions = SetIsOwnerAction | LoadInviteAction;

interface State {
  isOwner: boolean;
  isLoading: boolean;
  isError: boolean;
  error: string;
  invite: Invite;
}
const empty: State = {
  isOwner: false,
  isLoading: true,
  isError: false,
  error: "",
  invite: {
    _id: "",
    name: "",
    event: {
      _id: "",
      description: ""
    }
  }
};

const reducer: Reducer<State, Actions> = (state = empty, action): State => {
  switch (action.type) {
    case SET_IS_OWNER: {
      return {
        ...state,
        isOwner: action.payload.isOwner
      };
    }
    case LOAD_INVITE: {
      return {
        ...state,
        isLoading: false,
        invite: action.payload.invite
      };
    }
  }
  return state;
};

export default reducer;
