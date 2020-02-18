import { combineReducers } from "redux";

import stripe from "src/components/Stripe/reducer";
import rooms from "src/containers/Rooms/reducer";
import room from "src/containers/Room/reducer";

export default combineReducers({
  stripe,
  rooms,
  room
});
