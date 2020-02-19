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

export const selectNumPlayers = id =>
  createSelector(selectRoom(id), room => {
    let numPlayers = 0;
    if (room && room.players && room.players.length) {
      numPlayers = room.players.filter(({ userId }) => userId).length;
    }
    return numPlayers;
  });
