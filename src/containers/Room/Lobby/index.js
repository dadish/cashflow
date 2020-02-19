import React from "react";
import { useSelector } from "react-redux";

import { selectRoom } from "src/containers/Room/selectors";
import Player from "./Player";
import styles from "./styles.module.scss";

const Lobby = ({ roomId }) => {
  const room = useSelector(selectRoom(roomId));
  const players = [...room.players, {}, {}, {}, {}, {}, {}].slice(0, 6);
  return (
    <div className={styles.container}>
      <h3>Lobby</h3>
      <div className={styles.players}>
        {players.map((player, index) => (
          <Player data={player} key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Lobby;
