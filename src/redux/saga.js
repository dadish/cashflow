import stripe from "src/components/Stripe/saga";
import rooms from "src/containers/Rooms/saga";
import room from "src/containers/Room/saga";

const allEffects = [...stripe, ...rooms, ...room];

export default function* rootSaga() {
  for (let i = 0; i < allEffects.length; i++) {
    yield allEffects[i];
  }
}
