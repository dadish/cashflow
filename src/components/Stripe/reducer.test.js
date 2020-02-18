import { createNextState } from "@reduxjs/toolkit";
import reducer, {
  initialState,
  imageLoadInit,
  imageLoadStart,
  imageLoadSuccess,
  imageLoadError
} from "./reducer";

const collection = "fast-track";

test.skip("imageLoadInit action changes nothing", () => {
  const nextState = reducer(initialState, imageLoadInit({ collection }));
  expect(nextState).toBe(initialState);
});

test.skip("imageLoadStart action sets the collection inProgress to true and clear the error if any", () => {
  const state = createNextState(initialState, draft => {
    draft.images[collection].error = new Error("Some error");
  });
  const nextState = reducer(state, imageLoadStart({ collection }));
  expect(nextState).not.toBe(initialState);
  expect(nextState.images[collection].inProgress).toBe(true);
  expect(nextState.images[collection].error).toBe(null);
});

test.skip("imageLoadStart action does nothing if no collection match found", () => {
  const nextState = reducer(
    initialState,
    imageLoadStart({ collection: "some-random-thing" })
  );
  expect(nextState).toBe(initialState);
});

test.skip("imageLoadSuccess action sets the collection inProgress to false and sets the canvasContext", () => {
  const state = createNextState(initialState, draft => {
    draft.images[collection].inProgress = true;
  });
  const canvasContext = new CanvasRenderingContext2D();
  const nextState = reducer(
    state,
    imageLoadSuccess({ collection, canvasContext })
  );
  expect(nextState).not.toBe(initialState);
  expect(nextState.images[collection].inProgress).toBe(false);
  expect(nextState.images[collection].canvasContext).toBe(canvasContext);
});

test.skip("imageLoadSuccess action does nothing if no collection match found", () => {
  const nextState = reducer(
    initialState,
    imageLoadSuccess({ collection: "some-random-thing" })
  );
  expect(nextState).toBe(initialState);
});

test.skip("imageLoadError action sets the collection inProgress to false and sets the error", () => {
  const state = createNextState(initialState, draft => {
    draft.images[collection].inProgress = true;
  });
  const error = new Error("People make mistakes.");
  const nextState = reducer(state, imageLoadError({ collection, error }));
  expect(nextState).not.toBe(initialState);
  expect(nextState.images[collection].inProgress).toBe(false);
  expect(nextState.images[collection].error).toBe(error);
});

test.skip("imageLoadError action does nothing if no collection match found", () => {
  const nextState = reducer(
    initialState,
    imageLoadError({ collection: "some-random-thing" })
  );
  expect(nextState).toBe(initialState);
});
