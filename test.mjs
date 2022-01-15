import { expand } from "./index.mjs";
import test from "ava";

test("expand - throws if input word is not string", (t) => {
  const error = t.throws(
    () => {
      expand();
    },
    { instanceOf: TypeError }
  );

  t.is(error.message, "Guess must be a string.");
});

test("expand - expands guess to matrix", (t) => {
  t.deepEqual(expand("clang"), [
    ["c", undefined],
    ["l", undefined],
    ["a", undefined],
    ["n", undefined],
    ["g", undefined],
  ]);
});
