import React from "react";
import classnames from "classnames";

import colors from "src/styles/colors";
import Stripe from "src/components/Stripe";
import styles from "./styles.module.scss";

const Player = ({ data, index }) => {
  return (
    <div className={classnames(styles.container, styles[`color${index}`])}>
      <Stripe
        collection="ui"
        name="player_male_white"
        color={colors[`player${index}`]}
        className={styles.img}
      />
      <div className={styles.name}>{data.name ? data.name : ""}</div>
    </div>
  );
};

export default Player;
