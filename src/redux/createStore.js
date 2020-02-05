import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducer";
import rootSaga from "./saga";

export default function createStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer,
    middleware: [sagaMiddleware]
  });

  sagaMiddleware.run(rootSaga);

  return store;
}
