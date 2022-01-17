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

test("returns for partial guess", (t) => {
  t.deepEqual(assess("sales", "spa"), [
    ["s", "correct"],
    ["p", "absent"],
    ["a", "present"],
    [undefined, "absent"],
    [undefined, "absent"],
  ]);
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

test("some letters of all types, but no duplicate letters", (t) => {
  t.deepEqual(assess("cigar", "clang"), [
    ["c", "correct"],
    ["l", "absent"],
    ["a", "present"],
    ["n", "absent"],
    ["g", "present"],
  ]);
});

test("dulpicated letter in guess outnumber those in answer", (t) => {
  t.deepEqual(assess("sales", "swiss"), [
    ["s", "correct"],
    ["w", "absent"],
    ["i", "absent"],
    ["s", "absent"],
    ["s", "correct"],
  ]);

  t.deepEqual(assess("abate", "bible"), [
    ["b", "present"],
    ["i", "absent"],
    ["b", "absent"],
    ["l", "absent"],
    ["e", "correct"],
  ]);
});

test("works with arbritatry length words", (t) => {
  t.deepEqual(assess("hypnosis", "hip"), [
    ["h", "correct"],
    ["i", "present"],
    ["p", "correct"],
    [undefined, "absent"],
    [undefined, "absent"],
    [undefined, "absent"],
    [undefined, "absent"],
    [undefined, "absent"],
  ]);
});
