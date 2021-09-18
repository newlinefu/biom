import { combineReducers, createStore } from "redux";
import passwordControlsReducer from "../components/password-controls/reducers/password-controls";

const combinedReducers = combineReducers({
  passwordControls: passwordControlsReducer,
});

const store = createStore(combinedReducers);

export default store;
