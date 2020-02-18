import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Modal, { TRANSITION_TIME } from "src/components/Modal";
import Button from "src/components/Button";
import InputPassword from "src/components/InputPassword";
import Spacer from "src/components/Spacer";
import { selectRoom } from "src/containers/Room/selectors";
import styles from "./styles.module.scss";

const SelectRoom = ({ roomId, navigate }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [submittedPassword, setSubmittedPassword] = useState("");
  const room = useSelector(selectRoom(roomId));
  if (!room) {
    return null;
  }

  // close the modal on request
  function handleRequestClose() {
    setIsOpen(false);
    setTimeout(() => navigate("/rooms", { replace: true }), TRANSITION_TIME);
  }

  function handleSubmit(values) {
    if (room.password && values.password !== room.password) {
      setSubmittedPassword(values.password);
      return;
    }
    navigate(`/room/${roomId}`);
  }

  const validationSchema = room.password
    ? Yup.object({
        password: Yup.string().required("Required")
      })
    : null;

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
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {formik => {
          return (
            <Form>
              {!!room.password && (
                <InputPassword
                  label="Password"
                  name="password"
                  autoComplete="new-password"
                />
              )}
              {room.password &&
                formik.submitCount > 0 &&
                formik.values.password === submittedPassword &&
                submittedPassword !== room.password && (
                  <div className={styles.error}>Incorrect Password.</div>
                )}
              <Spacer />
              <Button name="submit" className={styles.submit}>
                JOIN
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default SelectRoom;
