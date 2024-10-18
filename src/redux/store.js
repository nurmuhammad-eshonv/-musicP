import { createStore, combineReducers } from "redux";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
  users: userReducer
});

export const store = createStore(reducers);