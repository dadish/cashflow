import React from "react";
import ReactModal from "react-modal";
import classnames from "classnames";

import styles from "./styles.module.scss";

export const TRANSITION_TIME = 120;

const Modal = ({ className, ...props }) => (
  <ReactModal
    className={{
      base: classnames(styles.base, className),
      afterOpen: styles.afterOpen,
      beforeClose: styles.beforeClose
    }}
    closeTimeoutMS={TRANSITION_TIME}
    {...props}
  />
);

export default Modal;
