import { takeLatest, call, select } from "redux-saga/effects";

import { db } from "src/services/Firebase";
import { createUpdaterSaga } from "src/redux/sagaHelpers";
import {
  joinRoomStart,
  joinRoomSuccess,
  joinRoomError,
  updateRoomSuccess,
  updateRoomError,
  leaveRoom
} from "./reducer";

function* joinRoomStartSaga({ payload: { roomId } }) {
  const alreadyJoined = yield select(s => s.room.id === roomId);
  if (alreadyJoined) {
    return;
  }
  yield call(createUpdaterSaga, {
    dbRef: db.ref(`/rooms/${roomId}`),
    normalizeData: ([id, data]) => ({ id, data: { id, ...data } }),
    actionSuccess: joinRoomSuccess,
    actionError: joinRoomError,
    terminationPattern: [joinRoomSuccess, joinRoomError]
  });
}

function* roomUpdaterSaga() {
  const roomId = yield select(s => s.room.id);
  if (!roomId) {
    return;
  }
  yield call(createUpdaterSaga, {
    dbRef: db.ref(`/rooms/${roomId}`),
    normalizeData: ([id, data]) => ({ id, data: { id, ...data } }),
    actionSuccess: updateRoomSuccess,
    actionError: updateRoomError,
    terminationPattern: [leaveRoom]
  });
}

export default [
  takeLatest(joinRoomStart, joinRoomStartSaga),
  takeLatest(joinRoomSuccess, roomUpdaterSaga)
];
