import React from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";

import { selectRoom } from "src/containers/Rooms/selectors";
import styles from "./styles.module.scss";

const SelectRoom = ({ roomId, navigate }) => {
  const room = useSelector(selectRoom(roomId));
  if (!room) {
    return null;
  }
  return (
    <Modal
      className={styles.content}
      isOpen={!!room && !!room.timeCreated}
      onRequestClose={() => navigate("/rooms")}
    >
      <h2>{room.name}</h2>
    </Modal>
  );
};

export default SelectRoom;
