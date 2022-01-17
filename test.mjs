import assess from "./index.mjs";
import test from "ava";

test("throws with without answer", (t) => {
  const error = t.throws(
    () => {
      assess();
    },
    { instanceOf: TypeError }
  );

  t.is(error.message, "Answer must be a string.");
});
