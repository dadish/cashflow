import { takeLatest, call } from "redux-saga/effects";

import { db } from "src/services/Firebase";
import { createUpdaterSaga } from "src/redux/sagaHelpers";
import { joinRoomStart, joinRoomSuccess, joinRoomError } from "./reducer";

function* joinRoomStartSaga({ payload: { roomId } }) {
  yield call(createUpdaterSaga, {
    dbRef: db.ref(`/rooms/${roomId}`),
    normalizeData: ([id, data]) => ({ id, data: { id, ...data } }),
    actionSuccess: joinRoomSuccess,
    actionError: joinRoomError,
    terminationPattern: [joinRoomSuccess, joinRoomError]
  });
}

export default [takeLatest(joinRoomStart, joinRoomStartSaga)];
