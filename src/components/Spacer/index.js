import React from "react";

import styles from "./styles.module.scss";

const Spacer = ({ times, ...props }) => (
  <div
    className={styles.container}
    style={{ height: `${times}rem` }}
    {...props}
  />
);

Spacer.defaultProps = {
  times: 1
};

export default Spacer;
