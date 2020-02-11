import React from "react";
import { useDispatch } from "react-redux";
import { fetchListStart } from "./reducer";

function Rooms() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchListStart());
  }, [dispatch]);
  return <h1>Rooms</h1>;
}

export default Rooms;
