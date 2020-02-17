import React from "react";
import classnames from "classnames";
import { useField } from "formik";

import styles from "./styles.module.scss";

const Input = ({ className, label, ...props }) => {
  const type = props.type || "text";
  const [field, meta] = useField({ type, ...props });
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className={classnames(styles.input, className)}
        type={type}
        {...props}
        {...field}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Input;
