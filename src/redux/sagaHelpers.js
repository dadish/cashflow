import { eventChannel } from "redux-saga";
import { call, take, put, cancelled, fork, cancel } from "redux-saga/effects";

export const createFirebaseRefChannel = (dbRef, event) =>
  eventChannel(emit => {
    function handleSnapshot(snap) {
      emit([snap.key, snap.val()]);
    }
    dbRef.on(event, handleSnapshot);
    return () => dbRef.off(event, handleSnapshot);
  });

export function* createUpdaterSaga(settings) {
  const {
    dbRef,
    event,
    normalizeData,
    actionSuccess,
    actionError,
    terminationPattern
  } = {
    normalizeData: d => d,
    event: "value",
    ...settings
  };

  function* updaterLoop() {
    let changesChannel;
    try {
      changesChannel = yield call(createFirebaseRefChannel, dbRef, event);
      while (true) {
        const data = yield take(changesChannel);
        yield put(actionSuccess(normalizeData(data)));
      }
    } catch (error) {
      yield put(actionError({ error }));
    } finally {
      if (yield cancelled() && typeof changesChannel === "function") {
        changesChannel.close();
      }
    }
  }

  const task = yield fork(updaterLoop);
  yield take(terminationPattern);
  yield cancel(task);
}
