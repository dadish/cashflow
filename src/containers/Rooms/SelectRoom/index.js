import React, { useState } from "react";
import { useSelector } from "react-redux";

import Modal, { TRANSITION_TIME } from "src/components/Modal";
import { selectRoom } from "src/containers/Rooms/selectors";

const SelectRoom = ({ roomId, navigate }) => {
  const [isOpen, setIsOpen] = useState(true);
  const room = useSelector(selectRoom(roomId));
  if (!room) {
    return null;
  }

  function handleRequestClose() {
    setIsOpen(false);
    setTimeout(() => navigate("/rooms"), TRANSITION_TIME);
  }
  return (
    <Modal isOpen={isOpen} onRequestClose={handleRequestClose}>
      <span>{room.name}</span>
    </Modal>
  );
};

export default SelectRoom;
