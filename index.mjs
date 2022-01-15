// correct | present | absent

export function expand(word) {
  if (typeof word !== "string") {
    throw new TypeError("Guess must be a string.");
  }

  return word.split("").map((letter) => [letter, undefined]);
}
