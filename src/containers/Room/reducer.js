import { createSlice, createNextState } from "@reduxjs/toolkit";

export const initialState = createNextState(
  {
    id: "",
    inProgress: false,
    error: null,
    players: [],
    numPlayers: 0,
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
    leaveRoom() {}
  }
});

const { reducer, actions } = slice;

export default reducer;

export const {
  joinRoomStart,
  joinRoomError,
  joinRoomSuccess,
  leaveRoom
} = actions;
