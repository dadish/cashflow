import { createSelector } from "@reduxjs/toolkit";

export const selectRoom = id =>
  createSelector(
    state => state.rooms.data,
    state => state.room,
    (rooms, room) => {
      if (room.id === id) {
        return room;
      }
      return rooms.find(room => room.id === id);
    }
  );
