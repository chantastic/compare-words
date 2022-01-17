export default function assess(answer, guess) {
  if (typeof answer !== "string") {
    throw new TypeError("Answer must be a string.");
  }

  // build a zipped array from answer to ensure the right array size
  let zipped = Array.from(answer, (_, i) => [guess[i], answer[i]]);

  let result = zipped.map(([guessLetter, answerLetter]) => {
    if (guessLetter === answerLetter) {
      return [guessLetter, "correct"];
    }
    if (guessLetter !== answerLetter && answer.includes(guessLetter)) {
      return [guessLetter, "present"];
    }
    return [guessLetter, "absent"];
  });

  return result;
}
