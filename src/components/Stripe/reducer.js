import { createSlice } from "@reduxjs/toolkit";
import uuidv4 from "uuid/v4";

import fastTrackImg from "assets/img/fasttrack.png";
import fastTrackData from "assets/img/fasttrack.json";
import uiImg from "assets/img/ui.png";
import uiData from "assets/img/ui.json";
import ui2Img from "assets/img/ui2.png";
import ui2Data from "assets/img/ui2.json";
import { findIndex } from "ramda";

function createStripe(data) {
  return {
    id: uuidv4(),
    img: "",
    inProgress: false,
    error: null,
    ...data
  };
}

const { reducer, actions } = createSlice({
  name: "stripe",
  initialState: {
    data: [],
    images: {
      "fast-track": {
        name: "fast-track",
        data: fastTrackData,
        img: fastTrackImg,
        inProgress: false,
        error: null
      },
      ui: {
        name: "ui",
        data: uiData,
        img: uiImg,
        inProgress: false,
        error: null
      },
      ui2: {
        name: "ui2",
        data: ui2Data,
        img: ui2Img,
        inProgress: false,
        error: null
      }
    }
  },
  reducers: {
    fetchItemStart(state, { payload: { name, collection, color } }) {
      const itemIndex = findIndex(item => {
        return (
          item.name === name &&
          item.collection === collection &&
          item.color === color
        );
      });
      if (itemIndex > -1) {
        const item = state.data[itemIndex];
        if (item.inProgress || item.img) {
          return;
        }
        item.inProgress = true;
        item.error = null;
      } else {
        state.data.push(
          createStripe({
            inProgress: true,
            name,
            collection,
            color
          })
        );
      }
    },

    fetchItemError(state, { payload: { name, collection, color, error } }) {
      const itemIndex = findIndex(item => {
        return (
          item.name === name &&
          item.collection === collection &&
          item.color === color
        );
      });
      if (itemIndex > -1) {
        const item = state.data[itemIndex];
        item.inProgress = false;
        item.error = error;
      } else {
        state.data.push(
          createStripe({
            name,
            collection,
            color,
            error
          })
        );
      }
    },

    fetchItemSuccess(
      state,
      { payload: { name, collection, color, imgData } }
    ) {}
  }
});

export default {
  reducer,
  actions
};
