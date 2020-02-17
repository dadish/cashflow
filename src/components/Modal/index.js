import React from "react";
import ReactModal from "react-modal";

import styles from "./styles.module.scss";

export const TRANSITION_TIME = 120;

const Modal = props => (
  <ReactModal
    className={{
      base: styles.base,
      afterOpen: styles.afterOpen,
      beforeClose: styles.beforeClose
    }}
    closeTimeoutMS={TRANSITION_TIME}
    {...props}
  />
);

export default Modal;
