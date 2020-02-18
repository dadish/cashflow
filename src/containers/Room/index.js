import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { selectRoom } from "./selectors";

const Room = ({ roomId }) => {
  const room = useSelector(selectRoom(roomId));
  if (!room) {
    return null;
  }
  return <h2>{room.name}</h2>;
};

export default Room;
