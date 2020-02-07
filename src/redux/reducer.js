import { combineReducers } from "redux";

import counter from "containers/Counter/reducer";
import stripe from "components/Stripe/reducer";

export default combineReducers({
  counter,
  stripe
});
