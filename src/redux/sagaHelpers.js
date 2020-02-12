import { eventChannel } from "redux-saga";
import { call, take, put, cancelled, fork, cancel } from "redux-saga/effects";

import { db } from "src/services/Firebase";

export const createFirebaseRefChannel = (path, configure) =>
  eventChannel(emit => {
    function handleValue(data) {
      emit([data.key, data.val()]);
    }
    const ref = configure(db.ref(path));
    ref.on("value", handleValue);
    return () => ref.off("value", handleValue);
  });

export function* createUpdaterSaga(settings) {
  const {
    path,
    configureRef,
    normalizeData,
    actionSuccess,
    actionError,
    terminationPattern
  } = {
    configureRef: r => r,
    normalizeData: d => d,
    ...settings
  };
  function* updaterLoop() {
    let changesChannel;
    try {
      changesChannel = yield call(createFirebaseRefChannel, path, configureRef);
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
