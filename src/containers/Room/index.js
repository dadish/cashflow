import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

const selectRoom = id =>
  createSelector(
    state => state.rooms.data,
    rooms => rooms.find(room => room.id === id)
  );

function Room({ id }) {
  const room = useSelector(selectRoom(id));
  if (!id) {
    return null;
  }
  return <li>{room.name}</li>;
}

export default Room;
