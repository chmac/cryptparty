import { Action, Reducer, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { Invite, getBySecretKey } from "../../services/invites";
import { sendReply as sendReplyToServer, Reply } from "../../services/replies";
import { AppState } from "../../store";

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
    secretKey: string;
    invite: Invite;
  };
}
const _loadInvite = (invite: Invite, secretKey: string): LoadInviteAction => ({
  type: LOAD_INVITE,
  payload: {
    secretKey,
    invite
  }
});
export const loadInvite = (
  secretKey: string
): ThunkAction<void, AppState, {}, AnyAction> => async (dispatch, getState) => {
  getBySecretKey(secretKey).then(invite => {
    dispatch(_loadInvite(invite, secretKey));
  });
};

const SEND_REPLY = "cryptparty/ViewInvite/SEND_REPLY";
export interface SendReplyAction extends Action<typeof SEND_REPLY> {
  payload: {
    reply: Reply;
  };
}
const _sendReply = (reply: Reply): SendReplyAction => ({
  type: SEND_REPLY,
  payload: {
    reply
  }
});
export const sendReply = (
  reply: Reply
): ThunkAction<void, AppState, {}, AnyAction> => dispatch => {
  // Send the reply
  sendReplyToServer("an event", "something", reply).then(response => {
    // Record success in state
    dispatch(_sendReply(reply));
  });
};

type Actions = SetIsOwnerAction | LoadInviteAction | SendReplyAction;

interface State {
  isOwner: boolean;
  isLoading: boolean;
  isError: boolean;
  error: string;
  secretKey: string;
  invite: Invite;
}
const empty: State = {
  isOwner: false,
  isLoading: true,
  isError: false,
  error: "",
  secretKey: "",
  invite: {
    _id: "",
    name: "",
    event: {
      _id: "",
      description: ""
    },
    reply: undefined
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
        secretKey: action.payload.secretKey,
        invite: action.payload.invite
      };
    }
    case SEND_REPLY: {
      return {
        ...state,
        invite: {
          ...state.invite,
          reply: action.payload.reply
        }
      };
    }
  }
  return state;
};

export default reducer;
