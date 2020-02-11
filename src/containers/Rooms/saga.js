import { eventChannel } from "redux-saga";
import {
  takeLatest,
  call,
  put,
  takeEvery,
  take,
  cancel,
  fork
} from "redux-saga/effects";

import { rooms } from "src/services/Firebase";
import {
  fetchListStart,
  fetchListSuccess,
  fetchListError,
  subscribeToList,
  fetchItemSuccess,
  unsubscribeFromList
} from "./reducer";

export const getLatestRooms = limit =>
  new Promise((resolve, reject) => {
    const result = [];
    const limitedRooms = rooms.limitToLast(limit);
    function handleValue(snapshot) {
      snapshot.forEach(room => {
        result.push({
          id: room.key,
          ...room.val()
        });
      });
      resolve(result);
      limitedRooms.off("value", handleValue);
    }
    limitedRooms.on("value", handleValue);
  });

export function* fetchListStartSaga() {
  try {
    const data = yield call(getLatestRooms, 10);
    yield put(fetchListSuccess({ data }));
    yield put(subscribeToList());
  } catch (error) {
    yield put(fetchListError({ error }));
  }
}

export function createRoomsChannel() {
  return eventChannel(emit => {
    function handleChildAdded(data) {
      emit({
        id: data.key,
        ...data.val()
      });
    }
    const limitedRooms = rooms.limitToLast(2);
    limitedRooms.on("child_added", handleChildAdded);
    return () => {
      limitedRooms.off("child_added", handleChildAdded);
    };
  });
}

export function* subscribeToListSaga() {
  const task = yield fork(subscribeLoopSaga);
  yield take(unsubscribeFromList);
  yield cancel(task);
}

export function* subscribeLoopSaga() {
  const roomsChannel = yield call(createRoomsChannel);
  try {
    while (true) {
      const data = yield take(roomsChannel);
      yield put(fetchItemSuccess({ id: data.id, data }));
    }
  } finally {
    roomsChannel.close();
  }
}

export default [
  takeLatest(fetchListStart, fetchListStartSaga),
  takeEvery(subscribeToList, subscribeToListSaga)
];
