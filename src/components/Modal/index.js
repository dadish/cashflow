import React from "react";
import ReactModal from "react-modal";

import styles from "./styles.module.scss";

const Modal = props => (
  <ReactModal
    className={{
      base: styles.base,
      afterOpen: styles.afterOpen,
      beforeClose: styles.beforeClose
    }}
    closeTimeoutMS={400}
    {...props}
  />
);

export default Modal;
