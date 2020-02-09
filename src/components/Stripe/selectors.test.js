import { createNextState } from "@reduxjs/toolkit";
import fastTrackImg from "assets/img/fasttrack.png";
import fastTrackData from "assets/img/fasttrack.json";
import colors from "styles/colors";
import { selectStripeImgData, selectStripeBase64Image } from "./selectors";

const collectionName = "fast-track";
const stripeName = "south_sea_island_fantasy";
const state = {
  stripe: {
    images: {
      [collectionName]: {
        name: "fast-track",
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
const props = {
  collection: collectionName,
  name: stripeName,
  color: colors.red
};

test("selectStripeImgData returns null if no canvasContext available for a collection", () => {
  expect(selectStripeImgData(state, props)).toBe(null);
});

test("selectStripeImgData returns cached ImageData if collection and name are the same", () => {
  const canvasContext = new CanvasRenderingContext2D();
  const imageData = { data: [] };
  canvasContext.getImageData.mockClear();
  canvasContext.getImageData.mockImplementationOnce(() => imageData);
  const nextState = createNextState(state, state => {
    state.stripe.images[collectionName].canvasContext = canvasContext;
  });
  const result = selectStripeImgData(nextState, props);
  selectStripeImgData(nextState, props);
  selectStripeImgData(nextState, props);
  selectStripeImgData(nextState, props);
  selectStripeImgData(nextState, props);
  expect(result).toBe(imageData);
  expect(canvasContext.getImageData).toHaveBeenCalledTimes(1);
});

test("selectStripeBase64Image returns null if there is no canvasContext available for a collection", () => {
  expect(selectStripeBase64Image(state, props)).toBe(null);
});
test("selectStripeImgData returns cached ImageData if collection and name are the same", () => {
  const canvasContext = new CanvasRenderingContext2D();
  const imageData = { data: [0, 0, 0, 0, 1, 2, 3, 4] };
  canvasContext.getImageData.mockClear();
  canvasContext.getImageData.mockImplementationOnce(() => imageData);
  const nextState = createNextState(state, state => {
    state.stripe.images[collectionName].canvasContext = canvasContext;
  });
  HTMLCanvasElement.prototype.toDataURL.mockClear();
  const result = selectStripeBase64Image(nextState, props);
  expect(selectStripeBase64Image(nextState, props)).toBe(result);
  expect(selectStripeBase64Image(nextState, props)).toBe(result);
  expect(selectStripeBase64Image(nextState, props)).toBe(result);
  expect(selectStripeBase64Image(nextState, props)).toBe(result);
  expect(canvasContext.putImageData).toHaveBeenCalledTimes(1);
  expect(HTMLCanvasElement.prototype.toDataURL).toHaveBeenCalledTimes(1);
});
