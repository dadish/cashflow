import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import classnames from "classnames";
import { useImmer } from "use-immer";

import styles from "./styles.module.scss";

const selectRoom = id =>
  createSelector(
    state => state.rooms.data,
    rooms => rooms.find(room => room.id === id)
  );

function Room({ id }) {
  const room = useSelector(selectRoom(id));
  const [styleNames, updateStyleNames] = useImmer({ [styles.li]: true });
  const className = classnames(styleNames);
  if (!id || !room) {
    return null;
  }
  function handlePointerEnter() {
    updateStyleNames(names => {
      names[styles.liHover] = true;
    });
  }
  function handlePointerLeave() {
    updateStyleNames(names => {
      names[styles.liHover] = false;
      names[styles.liDown] = false;
    });
  }
  function handlePointerDown() {
    updateStyleNames(names => {
      names[styles.liDown] = true;
    });
  }
  function handlePointerUp() {
    updateStyleNames(names => {
      names[styles.liDown] = false;
    });
  }
  return (
    <li
      className={className}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className={styles.playersCount}>
        <span className={styles.playersCountTxt}>
          [{room.numPlayers}/{room.maxPlayers}]
        </span>
      </div>
      <div className={styles.name}>
        {room.name}
        {room.password && (
          <span
            className={styles.password}
            role="img"
            aria-label="requires password"
            title="requires-password"
          >
            🔐
          </span>
        )}
      </div>
      <div className={styles.started}>
        {room.gameState.gameStarted && <i>(started)</i>}
      </div>
    </li>
  );
}

export default Room;
