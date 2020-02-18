import { createSelector } from "@reduxjs/toolkit";

export const selectRoom = id =>
  createSelector(
    state => state.rooms.data,
    rooms => rooms.find(room => room.id === id)
  );
