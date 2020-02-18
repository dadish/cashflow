import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { createNextState } from "@reduxjs/toolkit";

import fastTrackData from "src/assets/img/fasttrack.json";
import fastTrackImg from "src/assets/img/fasttrack.png";
import { loadImage, imageLoadInitSaga } from "./saga";
import { imageLoadStart, imageLoadSuccess, imageLoadError } from "./reducer";

const originalAddEventListener = HTMLImageElement.prototype.addEventListener;
const collection = "fast-track";
const state = {
  stripe: {
    images: {
      [collection]: {
        name: collection,
        data: fastTrackData,
        src: fastTrackImg,
        size: [2996, 494],
        canvasContext: null,
        inProgress: false,
        error: null
      }
    }
  }
};

beforeAll(() => {
  HTMLImageElement.prototype.addEventListener = function(event, fn) {
    setTimeout(() => {
      this.dispatchEvent(new Event(event));
    }, 100);
    originalAddEventListener.call(this, event, fn);
  };
});

afterAll(() => {
  HTMLImageElement.prototype.addEventListener = originalAddEventListener;
});

test.skip("loadImage resolves with canvasContext if everything is ok", async () => {
  const result = await loadImage({
    src: fastTrackImg,
    width: 200,
    height: 200
  });
  expect(result).toBeInstanceOf(CanvasRenderingContext2D);
});

test.skip("imageLoadInit saga does not dispatch any action if collection is inProgress", () => {
  const nextState = createNextState(state, draft => {
    draft.stripe.images[collection].inProgress = true;
  });
  return expectSaga(imageLoadInitSaga, { payload: { collection } })
    .withState(nextState)
    .run()
    .then(results => {
      const { effects } = results;
      expect(Object.keys(effects).includes("put")).toBe(false);
    });
});

test.skip("imageLoadInit saga does not dispatch any action if collection has canvasContext", () => {
  const nextState = createNextState(state, draft => {
    draft.stripe.images[
      collection
    ].canvasContext = new CanvasRenderingContext2D();
  });
  return expectSaga(imageLoadInitSaga, { payload: { collection } })
    .withState(nextState)
    .run()
    .then(results => {
      const { effects } = results;
      expect(Object.keys(effects).includes("put")).toBe(false);
    });
});

test.skip("imageLoadInit dispatches imageLoadStart and then imageLoadSuccess actions if everything is ok", () => {
  const canvasContext = new CanvasRenderingContext2D();
  return expectSaga(imageLoadInitSaga, { payload: { collection } })
    .withState(state)
    .provide([[matchers.call.fn(loadImage), canvasContext]])
    .put(imageLoadStart({ collection }))
    .put(imageLoadSuccess({ collection, canvasContext }))
    .run();
});

test.skip("imageLoadInit dispatches imageLoadStart and then imageLoadError actions if something goes wrong", () => {
  const error = new Error("Something went wrong.");
  return expectSaga(imageLoadInitSaga, { payload: { collection } })
    .withState(state)
    .provide([[matchers.call.fn(loadImage), Promise.reject(error)]])
    .put(imageLoadStart({ collection }))
    .put(imageLoadError({ collection, error }))
    .run();
});
