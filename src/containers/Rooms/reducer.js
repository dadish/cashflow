import { createSlice, createNextState } from "@reduxjs/toolkit";

import * as listHelpers from "src/redux/listReducerHelpers";
import findIndex from "ramda/src/findIndex";
import isEmpty from "ramda/src/isEmpty";
import { applyDiff } from "deep-diff";

export const createItem = listHelpers.createItem;

export const initialState = createNextState(
  {
    data: [],
    inProgress: false,
    error: null
  },
  () => {}
);

export const MAX_ITEMS_NUMBER = 15;

const slice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    ...listHelpers.reducers,
    subscribeToList(state) {
      state.data = [];
    },
    subscribeToListError(state, { payload: { error } }) {
      state.error = error;
    },
    unsubscribeFromList() {},
    fetchItemSuccess(state, { payload: { id, data } }) {
      const itemIndex = findIndex(item => item.id === id, state.data);
      if (itemIndex > -1 || isEmpty(id) || isEmpty(data)) {
        return;
      }
      state.data.unshift(createItem(data));
    },
    updateRoomSuccess(state, { payload: { id, data } }) {
      const roomIndex = findIndex(room => room.id === id, state.data);
      if (roomIndex < 0) {
        return;
      }
      applyDiff(state.data[roomIndex], data);
    },
    updateRoomError(state, { payload: { id, error } }) {
      const roomIndex = findIndex(room => room.id === id, state.data);
      if (roomIndex < 0) {
        return;
      }
      state.data[roomIndex].error = error;
    }
  }
});

const { reducer, actions } = slice;

export default reducer;

export const {
  subscribeToList,
  subscribeToListError,
  unsubscribeFromList,
  updateRoomSuccess,
  updateRoomError,
  fetchItemStart,
  fetchItemError,
  fetchItemSuccess,
  updateItemSuccess,
  removeItemStart,
  removeItemError,
  removeItemSuccess
} = actions;
