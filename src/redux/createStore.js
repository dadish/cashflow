import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducer";

export default function createStore() {
  return configureStore({
    reducer
  });
}
