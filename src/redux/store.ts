import { combineReducers, createStore } from "redux";
import passwordControlsReducer from "../components/password-controls/reducers/password-controls";

const combinedReducers = combineReducers({
  passwordControls: passwordControlsReducer,
});

const store = createStore(
  combinedReducers,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
