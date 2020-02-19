import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectRoom } from "./selectors";
import { joinRoomStart, leaveRoom } from "./reducer";
import Loading from "src/components/Loading";
import Game from "./Game";
import Lobby from "./Lobby";

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

  // if there is no room data then we wait
  if (!room || !room.id) {
    return <Loading />;
  }

  // if the game did not start yet then we render room lobby
  if (/* !room.gameState.gameStarted */ true) {
    return <Lobby roomId={roomId} />;
  }

  // render the game
  return <Game roomId={roomId} />;
};

export default Room;
