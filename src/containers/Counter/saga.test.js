import { delay } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import { stepUp } from "./saga";
import { increment } from "./reducer";

test("stepUp dispatches increment action after 2 seconds", () => {
  return expectSaga(stepUp, increment())
    .provide([[delay(2000), null]])
    .put(increment({ steppedUp: true }))
    .run()
    .then(result => {
      const { effects } = result;
      expect(effects.call[0]).toEqual(delay(2000));
    });
});

test("stepUp does not do anything if it already did stepUp", () => {
  return expectSaga(stepUp, increment({ steppedUp: true }))
    .run()
    .then(result => {
      const { effects } = result;
      console.log(effects);
      expect(Object.keys(effects).length).toBe(0);
    });
});
