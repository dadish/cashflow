import { delay, put, takeLatest } from "redux-saga/effects";
import path from "ramda/src/path";

import { increment } from "./reducer";

export function* stepUp(action) {
  if (path(["payload", "steppedUp"], action)) {
    return;
  }
  yield delay(2000);
  yield put(increment({ steppedUp: true }));
}

export default [takeLatest(increment, stepUp)];
