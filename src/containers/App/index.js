import React from "react";
import { Router } from "@reach/router";

import Greetings from "src/containers/Greetings";
import Rooms from "src/containers/Rooms";
import SelectRoom from "src/containers/Rooms/SelectRoom";

function App() {
  return (
    <Router>
      <Greetings path="/" />
      <Rooms path="/rooms">
        <SelectRoom path=":id" />
      </Rooms>
    </Router>
  );
}

export default App;
