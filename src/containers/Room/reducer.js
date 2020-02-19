import { createSlice, createNextState } from "@reduxjs/toolkit";
import { applyDiff } from "deep-diff";

export const initialState = createNextState(
  {
    id: "",
    error: null,
    players: [],
    gameState: {
      gameStarted: false,
      turn: 0,
      turnState: {
        id: ""
      }
    },
    maxPlayers: 0,
    name: "",
    password: "",
    timeCreated: 0
  },
  () => {}
);

const slice = createSlice({
  name: "room",
  initialState,
  reducers: {
    joinRoomStart(state) {
      state.inProgress = true;
    },
    joinRoomError(state, { payload: { error } }) {
      state.inProgress = false;
      state.error = error;
    },
    joinRoomSuccess(state, { payload: { data } }) {
      Object.assign(state, {
        inProgress: false,
        ...data
      });
    },
    updateRoomSuccess(state, { payload: { data } }) {
      data.error = state.error;
      applyDiff(state, data);
    },
    updateRoomError(state, { payload: { error } }) {
      state.error = error;
    },
    leaveRoom() {}
  }
});

const { reducer, actions } = slice;

export default reducer;

export const {
  joinRoomStart,
  joinRoomError,
  joinRoomSuccess,
  updateRoomSuccess,
  updateRoomError,
  leaveRoom
} = actions;
