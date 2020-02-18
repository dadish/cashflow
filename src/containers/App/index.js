import React from "react";
import { Router } from "@reach/router";

import Greetings from "src/containers/Greetings";
import Rooms from "src/containers/Rooms";
import Room from "src/containers/Room";
import SelectRoom from "src/containers/Rooms/SelectRoom";

function App() {
  return (
    <Router>
      <Greetings path="/" />
      <Rooms path="/rooms">
        <SelectRoom path=":roomId" />
      </Rooms>
      <Room path="/room/:roomId" />
    </Router>
  );
}

export default App;
