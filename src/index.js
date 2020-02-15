import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Modal from "react-modal";

import App from "src/containers/App";
import createStore from "src/redux/createStore";
import "./index.scss";

const store = createStore();

Modal.setAppElement("#root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
