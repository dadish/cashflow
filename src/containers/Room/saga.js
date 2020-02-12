import { takeEvery, call } from "redux-saga/effects";

import { db } from "src/services/Firebase";
import { createUpdaterSaga } from "src/redux/sagaHelpers";
import {
  fetchItemSuccess,
  gameStarted,
  gameStartedError,
  ignore
} from "src/containers/Rooms/reducer";

function* gameStartWatcher({ payload: { id } }) {
  yield call(createUpdaterSaga, {
    dbRef: db.ref(`/rooms/${id}/gameState/gameStarted`),
    actionSuccess: ([key, value]) => (value ? gameStarted({ id }) : ignore()),
    actionError: gameStartedError,
    terminationPattern: ({ type, payload }) =>
      type === gameStarted.toString() && payload.id === id
  });
}

export default [takeEvery(fetchItemSuccess, gameStartWatcher)];
