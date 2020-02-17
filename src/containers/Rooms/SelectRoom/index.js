import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";

import Modal, { TRANSITION_TIME } from "src/components/Modal";
import Button from "src/components/Button";
import InputPassword from "src/components/InputPassword";
import Spacer from "src/components/Spacer";
import { selectRoom } from "src/containers/Rooms/selectors";
import styles from "./styles.module.scss";

const SelectRoom = ({ roomId, navigate }) => {
  const [isOpen, setIsOpen] = useState(true);
  const room = useSelector(selectRoom(roomId));
  if (!room) {
    return null;
  }

  // close the modal on request
  function handleRequestClose() {
    setIsOpen(false);
    setTimeout(() => navigate("/rooms"), TRANSITION_TIME);
  }

  function handleSubmit(values) {
    console.log("handleSubmit", values);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      className={styles.container}
    >
      <h3 className={styles.title}>Room: {room.name}</h3>
      <h4 className={styles.playersCount}>
        Players: {room.numPlayers}/{room.maxPlayers}
      </h4>
      {room.gameState.gameStarted && <h4>Game Started</h4>}
      <Formik
        initialValues={{
          password: ""
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          {!!room.password && (
            <InputPassword
              label="Password: "
              name="password"
              autoComplete="new-password"
            />
          )}
          <Spacer />
          <Button name="submit" className={styles.submit}>
            JOIN
          </Button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default SelectRoom;
