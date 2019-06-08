import { Reducer, Action, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import sortBy from "lodash/fp/sortBy";

import { AppState } from "../../store";
import { create } from "../../services/invites";
import { Event, Invitee, getBySecretKey } from "../../services/events";
import history from "../../history";
import { Reply } from "../../services/replies";

const SET_SHOW_SAVE_MESSAGE = "cryptparty/ManageEvent/SET_SHOW_SAVE_MESSAGE";
export interface SetShowSaveMessageAction
  extends Action<typeof SET_SHOW_SAVE_MESSAGE> {
  payload: {
    showSaveMessage: boolean;
  };
}
export const setShowSaveMessage = (
  showSaveMessage: boolean
): SetShowSaveMessageAction => ({
  type: SET_SHOW_SAVE_MESSAGE,
  payload: {
    showSaveMessage
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
): ThunkAction<void, AppState, {}, AnyAction> => async dispatch => {
  try {
    const event = await getBySecretKey(secretKey);
    dispatch(_loadEvent(secretKey, event));
  } catch (error) {
    dispatch(_loadEventError(error.message));
  }
};

const CREATE_INVITEE = "cryptparty/ManageEvent/CREATE_INVITEE";
export interface CreateInviteeAction extends Action<typeof CREATE_INVITEE> {
  payload: {
    invitee: Invitee;
  };
}
const _createInvitee = (invitee: Invitee): CreateInviteeAction => ({
  type: CREATE_INVITEE,
  payload: {
    invitee
  }
});

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
    result => {
      const { keys, invitee } = result;
      // Dispatch an action to save this invitee in our list
      dispatch(_createInvitee(invitee));
      // Redirect to the new invitation URL
      history.push(`/i/${keys.secretKey}/o`);
    }
  );
};

export type Actions =
  | SetShowSaveMessageAction
  | LoadEventErrorAction
  | LoadEventAction
  | CreateInviteeAction;

interface State {
  showSaveMessage: boolean;
  isLoading: boolean;
  isError: boolean;
  error: string;
  secreteKey: string;
  event: Event;
}
const empty: State = {
  showSaveMessage: false,
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

const replyToSortOrder = (reply: Reply | undefined): number => {
  switch (reply) {
    case Reply.YES:
      return 0;
    case Reply.MAYBE:
      return 1;
    case Reply.NO:
      return 2;
    default:
      return 3;
  }
};

const sortInvitees = sortBy((invitee: Invitee) => [
  replyToSortOrder(invitee.reply && invitee.reply.reply),
  invitee.name
]);

const reducer: Reducer<State, Actions> = (state = empty, action): State => {
  switch (action.type) {
    case SET_SHOW_SAVE_MESSAGE: {
      return { ...state, showSaveMessage: action.payload.showSaveMessage };
    }
    case LOAD_EVENT: {
      const invitees = sortInvitees(action.payload.event.invitees);
      return {
        ...state,
        isLoading: false,
        secreteKey: action.payload.secretKey,
        event: {
          ...action.payload.event,
          invitees: sortInvitees(action.payload.event.invitees)
        }
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
    case CREATE_INVITEE: {
      return {
        ...state,
        event: {
          ...state.event,
          invitees: sortInvitees([
            ...state.event.invitees,
            action.payload.invitee
          ])
        }
      };
    }
  }
  return state;
};

export default reducer;
