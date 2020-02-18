import { createSlice, createNextState } from "@reduxjs/toolkit";

import * as listHelpers from "src/redux/listReducerHelpers";
import findIndex from "ramda/src/findIndex";

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
    gameStarted(state, { payload: { id } }) {
      const itemIndex = findIndex(room => room.id === id, state.data);
      if (itemIndex < 0) {
        return;
      }
      state.data[itemIndex].gameState.gameStarted = true;
    },
    gameStartedError() {},
    ignore() {},
    numPlayersUpdated(state, { payload: { id, value } }) {
      const itemIndex = findIndex(room => room.id === id, state.data);
      if (itemIndex < 0) {
        return;
      }
      state.data[itemIndex].numPlayers = value;
    },
    numPlayersUpdatedError() {}
  }
});

const { reducer, actions } = slice;

export default reducer;

export const {
  subscribeToList,
  subscribeToListError,
  unsubscribeFromList,
  gameStarted,
  gameStartedError,
  ignore,
  numPlayersUpdated,
  numPlayersUpdatedError,
  fetchListStart,
  fetchListFail,
  fetchListError,
  fetchListSuccess,
  fetchItemStart,
  fetchItemFail,
  fetchItemError,
  fetchItemSuccess,
  updateItemSuccess,
  removeFirstItem,
  removeLastItem,
  removeItemStart,
  removeItemFail,
  removeItemError,
  removeItemSuccess
} = actions;
