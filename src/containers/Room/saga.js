import { takeEvery, call } from "redux-saga/effects";

import { db } from "src/services/Firebase";
import { createUpdaterSaga } from "src/redux/sagaHelpers";
import {
  fetchItemSuccess,
  gameStarted,
  gameStartedError,
  ignore,
  numPlayersUpdated,
  numPlayersUpdatedError,
  removeItemSuccess
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

function* playersCountWatcher({ payload: { id } }) {
  yield call(createUpdaterSaga, {
    dbRef: db.ref(`/rooms/${id}/players`),
    normalizeData: ([key, players]) => {
      if (!players || !players.length) {
        return {};
      }
      return { id, value: players.filter(({ userId }) => userId).length };
    },
    actionSuccess: numPlayersUpdated,
    actionError: ({ error }) => {
      return numPlayersUpdatedError({ error });
    },
    terminationPattern: ({ type, payload }) => {
      if (payload.id !== id) {
        return false;
      }
      return [removeItemSuccess.type, gameStarted.type].includes(type);
    }
  });
}

export default [
  takeEvery(fetchItemSuccess, gameStartWatcher),
  takeEvery(fetchItemSuccess, playersCountWatcher)
];
