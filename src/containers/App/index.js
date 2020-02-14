import React from "react";
import { Router } from "@reach/router";

import Greetings from "src/containers/Greetings";
import Rooms from "src/containers/Rooms";

function App() {
  return (
    <Router>
      <Greetings path="/" />
      <Rooms path="/rooms" />
    </Router>
  );
}

export default App;
