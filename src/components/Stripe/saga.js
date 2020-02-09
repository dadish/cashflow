import { takeEvery, select, call, put } from "redux-saga/effects";
import { selectCollection } from "./selectors";
import {
  imageLoadInit,
  imageLoadStart,
  imageLoadSuccess,
  imageLoadError
} from "./reducer";

export const loadImage = ({ src, width, height }) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.addEventListener("load", () => {
      const canv = document.createElement("canvas");
      canv.width = width;
      canv.height = height;
      const canvasContext = canv.getContext("2d");
      canvasContext.drawImage(img, 0, 0, width, height);
      resolve(canvasContext);
    });
    img.addEventListener("error", reject);
  });

export function* imageLoadInitSaga({ payload: { collection } }) {
  const { src, size, inProgress, canvasContext } = yield select(s =>
    selectCollection(s, { collection })
  );

  if (inProgress || canvasContext) {
    return;
  }
  yield put(imageLoadStart({ collection }));
  try {
    const canvasContext = yield call(loadImage, {
      src: src,
      width: size[0],
      height: size[1]
    });
    yield put(imageLoadSuccess({ canvasContext, collection }));
  } catch (error) {
    yield put(imageLoadError({ error }));
  }
}

export default [takeEvery(imageLoadInit, imageLoadInitSaga)];
