import React from "react";

import Stripe from "components/Stripe";
import colors from "styles/colors";
import styles from "./App.module.scss";

function App() {
  return (
    <Stripe
      collection="fast-track"
      name="south_sea_island_fantasy"
      color={colors.red}
      className={styles.stripe}
    />
  );
}

export default App;
