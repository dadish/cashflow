import React from "react";
import { useSelector } from "react-redux";

import Modal from "src/components/Modal";
import { selectRoom } from "src/containers/Rooms/selectors";

const SelectRoom = ({ roomId, navigate }) => {
  const room = useSelector(selectRoom(roomId));
  if (!room) {
    return null;
  }
  return (
    <Modal
      isOpen={!!room && !!room.timeCreated}
      onRequestClose={() => navigate("/rooms")}
    >
      <span>{room.name}</span>
    </Modal>
  );
};

export default SelectRoom;
