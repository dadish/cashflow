import { call, put, takeEvery, select } from "redux-saga/effects";

import { db } from "src/services/Firebase";
import { createUpdaterSaga } from "src/redux/sagaHelpers";
import {
  subscribeToList,
  subscribeToListError,
  fetchItemSuccess,
  unsubscribeFromList,
  MAX_ITEMS_NUMBER,
  removeItemSuccess,
  removeItemStart,
  ignore
} from "./reducer";

function* roomAddWatcher({ payload: { limit } }) {
  yield call(createUpdaterSaga, {
    dbRef: db
      .ref("/rooms")
      .limitToLast(limit || 10)
      .orderByChild("timeCreated"),
    event: "child_added",
    normalizeData: ([id, data]) => {
      const {
        chatlog,
        decks,
        fastTrackSpaces,
        players,
        playerOrder,
        ...rest
      } = data;
      return {
        id,
        data: {
          id,
          players,
          numPlayers: players.filter(({ userId }) => userId).length,
          ...rest
        }
      };
    },
    actionSuccess: payload =>
      payload.data.timeCreated ? fetchItemSuccess(payload) : ignore(),
    actionError: subscribeToListError,
    terminationPattern: unsubscribeFromList
  });
}

function* roomsRotatorSaga() {
  const numRooms = yield select(s => s.rooms.data.length);
  if (numRooms <= MAX_ITEMS_NUMBER) {
    return;
  }
  const room = yield select(s => s.rooms.data[s.rooms.data.length - 1]);
  yield put(removeItemStart({ id: room.id }));
}

function* removeItemStartSaga({ payload: { id } }) {
  yield put(removeItemSuccess({ id }));
}

export default [
  takeEvery(subscribeToList, roomAddWatcher),
  takeEvery(fetchItemSuccess, roomsRotatorSaga),
  takeEvery(removeItemStart, removeItemStartSaga)
];
