import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { subscribeToList } from "./reducer";
import Room from "src/containers/Room";
import styles from "./styles.module.scss";

const selectRooms = s => s.rooms.data.map(({ id }) => id);

function Rooms() {
  // dispatch fetchListStart when component mounts
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(subscribeToList({ limit: 13 }));
  }, [dispatch]);

  // get the rooms and list them
  const ids = useSelector(selectRooms);
  return (
    <ul className={styles.ul}>
      {ids.map(id => (
        <Room id={id} key={id} />
      ))}
    </ul>
  );
}

export default Rooms;
