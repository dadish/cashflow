import React from "react";
import { Router } from "@reach/router";

import Rooms from "src/containers/Rooms";

function App() {
  return (
    <Router>
      <Rooms path="/" />
    </Router>
  );
}

export default App;
