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

test("all letters 'absent'", (t) => {
  t.deepEqual(assess("abcde", "fghij"), [
    ["f", "absent"],
    ["g", "absent"],
    ["h", "absent"],
    ["i", "absent"],
    ["j", "absent"],
  ]);
});

test("all letters 'correct'", (t) => {
  t.deepEqual(assess("bonus", "bonus"), [
    ["b", "correct"],
    ["o", "correct"],
    ["n", "correct"],
    ["u", "correct"],
    ["s", "correct"],
  ]);
});

test("some letters 'correct', others 'absent'", (t) => {
  t.deepEqual(assess("bonus", "bogus"), [
    ["b", "correct"],
    ["o", "correct"],
    ["g", "absent"],
    ["u", "correct"],
    ["s", "correct"],
  ]);
});
