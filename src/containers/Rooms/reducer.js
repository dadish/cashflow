import { createSlice, createNextState } from "@reduxjs/toolkit";

import * as listHelpers from "src/redux/listReducerHelpers";

export const createItem = listHelpers.createItem;

export const initialState = createNextState(
  {
    data: [],
    inProgress: false,
    error: null
  },
  () => {}
);

export const MAX_ITEMS_NUMBER = 13;

const slice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    ...listHelpers.reducers,
    subscribeToList() {},
    unsubscribeFromList() {}
  }
});

const { reducer, actions } = slice;

export default reducer;

export const {
  fetchListStart,
  fetchListFail,
  fetchListError,
  fetchListSuccess,
  fetchItemStart,
  fetchItemFail,
  fetchItemError,
  fetchItemSuccess,
  subscribeToList,
  unsubscribeFromList,
  removeFirstItemSuccess,
  removeLastItemSuccess
} = actions;
