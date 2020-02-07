import counter from "containers/Counter/saga";
import stripe from "components/Stripe/saga";

const allEffects = [...counter, ...stripe];

export default function* rootSaga() {
  for (let i = 0; i < allEffects.length; i++) {
    yield allEffects[i];
  }
}
