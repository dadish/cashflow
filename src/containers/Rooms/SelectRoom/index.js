import React from "react";
import { useSelector } from "react-redux";

import { selectRoom } from "src/containers/Rooms/selectors";

const SelectRoom = ({ id }) => {
  const room = useSelector(selectRoom(id));
  if (!id || !room) {
    return null;
  }
  return <div>{room.name}</div>;
};

export default SelectRoom;
