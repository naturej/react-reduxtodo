import { rootReducer } from "reducer";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

export const store = createStore(
  rootReducer,
  process.env.NODE_ENV === "development" &&
    composeWithDevTools(applyMiddleware(logger))
);
