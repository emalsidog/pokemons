// Dependencies
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";

// Root reducer
import rootReducer from "./reducers";

// Root watcher
import { rootWatcher } from "./saga";

// Saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk), applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootWatcher);

export default store;
