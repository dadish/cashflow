import React, { useState } from "react";

import { StripeProvider } from "components/Stripe/Context";
import Stripe from "components/Stripe";
import colors from "styles/colors";

function App() {
  const [start, setStart] = useState(false);
  return (
    <StripeProvider>
      {start &&
        Object.values(colors).map(color => (
          <Stripe
            key={color}
            color={color}
            collection="fast-track"
            name="dinner_with_the_president"
          />
        ))}
      <button onClick={() => setStart(!start)}>start</button>
    </StripeProvider>
  );
}

export default App;
