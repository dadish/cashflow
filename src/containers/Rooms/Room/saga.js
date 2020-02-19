import { takeEvery, call } from "redux-saga/effects";

import { db } from "src/services/Firebase";
import { createUpdaterSaga } from "src/redux/sagaHelpers";
import {
  fetchItemSuccess,
  removeItemSuccess,
  unsubscribeFromList,
  updateRoomSuccess,
  updateRoomError
} from "src/containers/Rooms/reducer";
import { isEmpty } from "ramda";

function* roomUpdater({ payload: { id } }) {
  yield call(createUpdaterSaga, {
    dbRef: db.ref(`/rooms/${id}`),
    normalizeData: ([id, data]) => {
      if (!data || isEmpty(data) || isEmpty(data.gameState)) {
        return {};
      }
      return { id, data: { id, ...data } };
    },
    actionSuccess: updateRoomSuccess,
    actionError: updateRoomError,
    terminationPattern: ({ type, payload }) => {
      if (type === unsubscribeFromList.type) {
        return true;
      }
      if (payload.id !== id) {
        return false;
      }
      if (removeItemSuccess.type === type) {
        return true;
      }
      if (
        type === updateRoomSuccess.type &&
        payload.data.gameState.gameStarted
      ) {
        return true;
      }
      return false;
    }
  });
}

export default [takeEvery(fetchItemSuccess, roomUpdater)];
