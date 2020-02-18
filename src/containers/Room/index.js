import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectRoom } from "./selectors";
import { joinRoomStart, leaveRoom } from "./reducer";
import Players from "./Players";
import styles from "./styles.module.scss";

const Room = ({ roomId }) => {
  const room = useSelector(selectRoom(roomId));
  const dispatch = useDispatch();
  useEffect(() => {
    if (!roomId) {
      return;
    }
    dispatch(joinRoomStart({ roomId }));
    return () => dispatch(leaveRoom({}));
  }, [dispatch, roomId]);
  if (!room) {
    return null;
  }
  return (
    <div className={styles.container}>
      <Players />
    </div>
  );
};

export default Room;
