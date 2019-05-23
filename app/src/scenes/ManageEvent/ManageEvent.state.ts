import { Reducer, Dispatch, Action } from "redux";
import { ThunkAction } from "redux-thunk";

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

export type Actions = SetIsOwnerAction;

interface State {
  isOwner: boolean;
}
const empty: State = {
  isOwner: false
};
const reducer: Reducer<State, Actions> = (state = empty, action): State => {
  switch (action.type) {
    case SET_IS_OWNER: {
      return { isOwner: action.payload.isOwner };
    }
  }
  return state;
};

export default reducer;
