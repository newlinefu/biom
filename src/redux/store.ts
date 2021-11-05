import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import passwordControlsReducer from "../components/password-controls/reducers/password-controls";
import { watchVectorCalculatingAsync } from "../components/password-controls/sagas";

const combinedReducers = combineReducers({
  passwordControls: passwordControlsReducer,
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchVectorCalculatingAsync);

export default store;
