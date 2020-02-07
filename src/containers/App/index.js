import React from "react";

import Stripe from "components/Stripe";
import colors from "styles/colors";
import styles from "./App.module.scss";

function App() {
  return (
    <div>
      <Stripe
        collection="fast-track"
        name="pizza_franchise"
        color={colors.red}
        className={styles.stripe}
      />
    </div>
  );
}

export default App;
