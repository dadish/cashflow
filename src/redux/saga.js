import stripe from "src/components/Stripe/saga";
import rooms from "src/containers/Rooms/saga";

const allEffects = [...stripe, ...rooms];

export default function* rootSaga() {
  for (let i = 0; i < allEffects.length; i++) {
    yield allEffects[i];
  }
}
