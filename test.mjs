import { validate } from "./index.mjs";
import test from "ava";

test("Guess matches answer", async (t) => {
  t.is(validate("cigar", "cigar"), true);
});
