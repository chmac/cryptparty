import thunkMiddleware from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import CreateEvent from "./scenes/CreateEvent/CreateEvent.state";

const reducer = combineReducers({
  CreateEvent
});

export type AppState = ReturnType<typeof reducer>;

const composeEnhancers =
  typeof window === "object" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
