import { eventChannel } from "redux-saga";
import {
  call,
  put,
  takeEvery,
  take,
  cancel,
  fork,
  select
} from "redux-saga/effects";

import { rooms } from "src/services/Firebase";
import {
  subscribeToList,
  fetchItemSuccess,
  unsubscribeFromList,
  removeLastItem,
  MAX_ITEMS_NUMBER,
  removeItemSuccess,
  removeItemStart
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

export function createRoomsChannel(limit) {
  return eventChannel(emit => {
    function handleChildAdded(data) {
      const values = data.val();
      if (!values.name) {
        return;
      }
      const {
        chatlog,
        decks,
        fastTrackSpaces,
        players,
        playerOrder,
        ...rest
      } = values;
      emit([
        data.key,
        {
          numPlayers: players.length,
          ...rest
        }
      ]);
    }
    const limitedRooms = rooms.limitToLast(limit).orderByChild("timeCreated");
    limitedRooms.on("child_added", handleChildAdded);
    return () => {
      limitedRooms.off("child_added", handleChildAdded);
    };
  });
}

export function* subscribeToListSaga(action) {
  const limit = action.payload.limit || 10;
  const task = yield fork(subscribeLoopSaga, limit);
  yield take(unsubscribeFromList);
  yield cancel(task);
}

export function* subscribeLoopSaga(limit) {
  const roomsChannel = yield call(createRoomsChannel, limit);
  try {
    while (true) {
      const [id, value] = yield take(roomsChannel);
      yield call(console.log, value);
      yield put(fetchItemSuccess({ id, data: { id, ...value } }));
      const numRooms = yield select(s => s.rooms.data.length);
      if (numRooms > MAX_ITEMS_NUMBER) {
        yield put(removeLastItem());
      }
    }
  } finally {
    roomsChannel.close();
  }
}

function* removeLastItemSaga() {
  const room = yield select(s => s.rooms.data[s.rooms.data.length - 1]);
  yield put(removeItemStart({ id: room.id }));
  yield put(removeItemSuccess({ id: room.id }));
}

export default [
  takeEvery(subscribeToList, subscribeToListSaga),
  takeEvery(removeLastItem, removeLastItemSaga)
];
