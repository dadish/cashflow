import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

import styles from "./styles.module.scss";

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
  return (
    <li className={styles.li}>
      <span>{room.name}</span>
      {room.gameState.gameStarted && <span>[STARTED]</span>}
    </li>
  );
}

export default Room;
