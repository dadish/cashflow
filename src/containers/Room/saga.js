import { takeEvery, fork } from "redux-saga/effects";

import { createUpdaterSaga } from "src/redux/sagaHelpers";
import {
  fetchItemSuccess,
  gameStarted,
  gameStartedError,
  ignore
} from "src/containers/Rooms/reducer";

function* gameStartWatcher({ payload: { id } }) {
  yield fork(createUpdaterSaga, {
    path: `/rooms/${id}/gameState/gameStarted`,
    normalizeRef: r => r,
    normalizeData: data => data,
    actionSuccess: ([key, value]) => (value ? gameStarted({ id }) : ignore()),
    actionError: gameStartedError,
    terminationPattern: ({ type, payload }) =>
      type === gameStarted.toString() && payload.id === id
  });
}

export default [takeEvery(fetchItemSuccess, gameStartWatcher)];
