import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useImmer } from "use-immer";
import Mousetrap from "mousetrap";
import findIndex from "ramda/src/findIndex";

import { subscribeToList } from "./reducer";
import Room from "./Room";
import styles from "./styles.module.scss";

const selectRooms = s => s.rooms.data.map(({ id }) => id);

function Rooms({ children }) {
  const ids = useSelector(selectRooms);

  // dispatch fetchListStart when component mounts
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(subscribeToList({ limit: 13 }));
  }, [dispatch]);

  // manage the focus state
  const [focus, updateFocus] = useImmer({
    inFocus: false,
    focusId: ""
  });
  function handleFocus() {
    updateFocus(draft => {
      draft.inFocus = true;
    });
  }
  function handleBlur() {
    updateFocus(draft => {
      draft.inFocus = false;
    });
  }

  // handle key down
  useEffect(() => {
    if (!focus.inFocus) {
      return;
    }
    function handleKeyDown(ev) {
      let id = "";
      if (focus.focusId) {
        const focusIndex = findIndex(id => id === focus.focusId, ids);
        id = ids[(focusIndex + 1) % ids.length];
      } else {
        id = ids[0];
      }
      updateFocus(draft => {
        draft.focusId = id;
      });
    }
    Mousetrap.bind("down", handleKeyDown);
    return () => Mousetrap.unbind("down");
  }, [updateFocus, focus, ids]);

  // handle key up
  useEffect(() => {
    if (!focus.inFocus) {
      return;
    }
    function handleKeyUp(ev) {
      let id = "";
      if (focus.focusId) {
        const focusIndex = findIndex(id => id === focus.focusId, ids);
        id = ids[(focusIndex - 1 + ids.length) % ids.length];
      } else {
        id = ids[ids.length - 1];
      }
      updateFocus(draft => {
        draft.focusId = id;
      });
    }
    Mousetrap.bind("up", handleKeyUp);
    return () => Mousetrap.unbind("up");
  }, [updateFocus, focus, ids]);

  // handle tab
  useEffect(() => {
    if (!focus.inFocus) {
      return;
    }
    function handleTab() {
      updateFocus(draft => {
        draft.focusId = "";
      });
    }
    Mousetrap.bind("tab", handleTab);
    return () => Mousetrap.unbind("tab");
  }, [focus, updateFocus]);

  const handleRoomFocus = roomId => {
    updateFocus(draft => {
      draft.inFocus = true;
      draft.focusId = roomId;
    });
  };

  // render list of rooms
  return (
    <nav
      aria-labelledby="game-rooms-list"
      className={styles.nav}
      tabIndex="0"
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <h2 id="game-rooms-list" className={styles.title}>
        Game Rooms List
      </h2>
      <h4 className={styles.key}>{focus.key}</h4>
      <ul className={styles.ul}>
        {ids.map((id, index) => (
          <Room
            id={id}
            key={id}
            inFocus={focus.inFocus && id === focus.focusId}
            onFocus={handleRoomFocus}
          />
        ))}
      </ul>
      {children}
    </nav>
  );
}

export default Rooms;
