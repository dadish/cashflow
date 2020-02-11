import { createSlice, createNextState } from "@reduxjs/toolkit";

import fastTrackImg from "assets/img/fasttrack.png";
import fastTrackData from "assets/img/fasttrack.json";
import uiImg from "assets/img/ui.png";
import uiData from "assets/img/ui.json";
import ui2Img from "assets/img/ui2.png";
import ui2Data from "assets/img/ui2.json";
import { path } from "ramda";

export const initialState = createNextState(
  {
    images: {
      "fast-track": {
        name: "fast-track",
        data: fastTrackData,
        src: fastTrackImg,
        size: [2996, 494],
        canvasContext: null,
        inProgress: false,
        error: null
      },
      ui: {
        name: "ui",
        data: uiData,
        src: uiImg,
        size: [3585, 1009],
        canvasContext: null,
        inProgress: false,
        error: null
      },
      ui2: {
        name: "ui2",
        data: ui2Data,
        src: ui2Img,
        size: [1392, 2544],
        canvasContext: null,
        inProgress: false,
        error: null
      }
    }
  },
  () => {}
);

const slice = createSlice({
  name: "stripe",
  initialState,
  reducers: {
    /**
     * Does nothing to the state. Triggers imageLoadInitSaga saga.
     * @payload {string} collection The name of the collection.
     */
    imageLoadInit() {},

    /**
     * Indicates that the image loading started and is inProgress.
     * Dispatched by imageLoadInitSaga saga.
     * @payload {string} collection The name of the collection.
     */
    imageLoadStart(state, action) {
      const collection = state.images[action.payload.collection];
      if (!collection) {
        return;
      }
      collection.inProgress = true;
      collection.error = null;
    },

    /**
     * Indicates that the image has successflully loaded and processed.
     * Dispatched by imageLoadInitSaga saga.
     * @payload {string} collection The name of the collection
     * @payload {CanvasRenderingContext2D} canvasContext The canvas 2d
     * context representation of the collection image
     */
    imageLoadSuccess(state, action) {
      const collection = state.images[action.payload.collection];
      if (!collection) {
        return;
      }
      collection.inProgress = false;
      collection.canvasContext = action.payload.canvasContext;
    },

    /**
     * Indicates that something went wrong while loading the image.
     * dispatched by imageLoadInitSaga saga.
     * @payload {string} collection The name of the collection.
     * @payload {Error} error The error that occured during the loading.
     */
    imageLoadError(state, action) {
      const collection = state.images[action.payload.collection];
      if (!collection) {
        return;
      }
      collection.inProgress = false;
      collection.error = path(["payload", "error"], action);
    }
  }
});

export const { reducer, actions } = slice;

export const {
  imageLoadStart,
  imageLoadSuccess,
  imageLoadError,
  imageLoadInit
} = actions;

export default reducer;
