import counter from "containers/Counter/saga";

const allEffects = [...counter];

export default function* rootSaga() {
  for (let i = 0; i < allEffects.length; i++) {
    yield allEffects[i];
  }
}
