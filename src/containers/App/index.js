import React from "react";

import Stripe from "containers/Stripe";
import colors from "styles/colors";

function App() {
  return (
    <Stripe
      collection="fast-track"
      name="buy_a_gold_mine"
      color={colors.olive}
    />
  );
}

export default App;
