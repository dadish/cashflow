import stripe from "components/Stripe/saga";

const allEffects = [...stripe];

export default function* rootSaga() {
  for (let i = 0; i < allEffects.length; i++) {
    yield allEffects[i];
  }
}
