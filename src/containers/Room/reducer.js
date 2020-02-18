import { createSlice, createNextState } from "@reduxjs/toolkit";

import findIndex from "ramda/src/findIndex";

export const initialState = createNextState(
  {
      id: '',
      inProgress: false,
      error: null,
      players: [],
      numPlayers: 0,
      gameState: {
        gameStarted: false,
        turn: 0,
        turnState: {
          id: ''
        }
      },
      maxPlayers: 0,
      name: '',
      password: '',
      timeCreated: 0
  },
  () => {}
);

const slice = createSlice({
  name: "room",
  initialState,
  reducers: {
    fetchRoomStart() {},
    fetchRoomError() {},
    fetchRoomSuccess() {},
  }
});

const { reducer, actions } = slice;

export default reducer;

export const {
  fetchRoomStart
  fetchRoomError
  fetchRoomSuccess
} = actions;
