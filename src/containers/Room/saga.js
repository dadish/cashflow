import { eventChannel } from "redux-saga";
import {
  takeEvery,
  call,
  cancelled,
  take,
  put,
  fork,
  cancel
} from "redux-saga/effects";

import { createRoomRef } from "src/services/Firebase";
import {
  fetchItemSuccess,
  updateItemSuccess
} from "src/containers/Rooms/reducer";
import {
  removeFirstItemStart,
  removeLastItemStart
} from "src/redux/listReducerHelpers";

/**
 * Creates a channel that emits everytime there is a change in the room.
 * @param {number} id id of the room.
 * @return Channel
 */
export const createRoomChannel = id =>
  eventChannel(emit => {
    const room = createRoomRef(id);
    function handleChange(data) {
      emit({
        id: data.key,
        ...data.val()
      });
    }
    room.on("value", handleChange);
    return () => room.off("value", handleChange);
  });

export function* roomUpdaterSaga(id) {
  const roomChannel = yield call(createRoomChannel, id);
  try {
    while (true) {
      const data = yield take(roomChannel);
      yield put(updateItemSuccess({ id: data.id, data }));
    }
  } finally {
    if (yield cancelled()) {
      roomChannel.close();
    }
  }
}

export function* fetchItemSuccessSaga({ payload: { id } }) {
  const task = yield fork(roomUpdaterSaga, id);
  // const action = yield take(({ type, payload }) => {
  //   if (payload.id !== id) {
  //     return false;
  //   }
  //   return (
  //     type === removeFirstItemStart.toString() ||
  //     type === removeLastItemStart.toString()
  //   );
  // });
  yield cancel(task);
  yield put();
}

export default [
  // takeEvery(fetchItemSuccess, fetchItemSuccessSaga)
];
