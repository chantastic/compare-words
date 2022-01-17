export default function assess(answer, guess) {
  if (typeof answer !== "string") {
    throw new TypeError("Answer must be a string.");
  }
}
