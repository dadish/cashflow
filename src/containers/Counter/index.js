import React from "react";
import { connect } from "react-redux";

import { increment, decrement } from "containers/Counter/reducer";

function Counter({ counter, increment, decrement }) {
  return (
    <div>
      <button onClick={() => increment()}>+</button>
      <span>{counter}</span>
      <button onClick={() => decrement()}>-</button>
    </div>
  );
}

const mapState = s => s;

const mapDispatch = {
  increment,
  decrement
};

export default connect(mapState, mapDispatch)(Counter);
