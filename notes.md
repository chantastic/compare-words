# Notes

## Implementation spike

### Preparition

Wordle uses the following enum for its evaluations:

```ts
enum Direction {
  Correct,
  Present,
  Absent,
}
```

I like this just fine.

### First attempt

My first attempt was to do it in two passes.
The problem here is that you need a mechanism to communicate between the `correct`s and the `present`s.

`present` needs to know both how many of each letter exist in the answer and how many were guessed.
<mark>If the number of letters guessed exceeds those available, only thee number available are marked as `present`.</mark>

### Second attempt

My second attempt was to build up an abstract representation of words using a hash table.

```js
// "abbey"
{
    a: [0],
    b: [1, 2],
    e: [3],
    y: [4]
}
```

The word preparation function looked like this:

```js
// Turns a word into the abstract representation above
function createHashTable(word) {
  let result = {};

  word.split("").forEach((letter, index) => {
    if (result[letter]) {
      result[letter].push(index);
    } else {
      result[letter] = [index];
    }
  });

  return result;
}
```

This works but I found that it was pretty difficult to compare the letter counts. Obects, arrays, lengths, positions spread across properties. A little to abstract for my human brain — too many dimensions.

`answerLetters x answerIndex x guessLetter x guessIndexes`

```js
// The path I was going down when I gave up…
// answer letters
Object.entries(answerTable).forEach(([answerLetter, answerIndexes]) => {
  console.log(`- ${answerLetter}`);
  answerIndexes.forEach((answerIndex) => {
    console.log(`--- ${answerIndex}`);
    Object.entries(guessTable).forEach(([guessLetter, guessIndexes]) => {
      console.log(`----- ${guessLetter}`);
      guessIndexes.forEach((guessIndex) => {
        console.log(
          `------- ${answerLetter}: ${answerIndex}, ${guessLetter}: ${guessIndex}`
        );
      });
    });
  });
});
```

I also needed some intermediate pool to track what was available.

### Third attempt

Ok. So this time I kinda know what I'm looking for and what I need to test.

- I thesaurused a bit and like the function name `assess`
  - Additionally considered was `evaluate` and `estimate` — which were less fitting
- a two-pass approach really does seam easiest
  - (that or recursion — if i were smarter)
  - first pass creates the pool of available letters and their number
  - second pass assumes that cerrect letters are correct
    - the first/next non-precise letter match is marked as `present` and the pool count for that letter is decremented
- Start from the most basic, unanimous cases
  - All `absent` (no intersection)
  - All `present` (same word)
- Layer in mixed cases, starting with `absent` and `present`
- I need a "pool" to capture `answer` characters that were not precision matched and their total number: `{a: 1, b: 2, e: 1, y: 1}`
  - This is kinda like my hash-table idea but eliminates positional data for the ease of a single value
  - And if we eleminated all of the `correct` letters, position of available characters is irrelevant
- I'd developed a return shape that I like: an array of tuples `[{character}, {assessment}]`

```js
// answer: abbey, guess: bible
[
  [b, "pressent"],
  [i, "absent"],
  [b, "correct"],
  [l, "absent"],
  [e, "present"],
];
```

### Sample function structure

At the point that I felt direction in my spike, I had a function body like this:

```js
export default function assess(answer, guess) {
  // gotta have an answer for this thing to work
  // i assume that the answer is valid (because I own it)
  // and i assume the guess has been validated at this point
  if (typeof answer !== "string") {
    throw new TypeError("Answer must be a string.");
  }

  // build a zipped array from answer to ensure the right array size
  let zipped = Array.from(answer, (_, i) => [guess[i], answer[i]]);

  let result = zipped.map(([guessLetter, answerLetter]) => {
    if (guessLetter === answerLetter) {
      return [guessLetter, "correct"];
    }
    return [guessLetter, "absent"];
  });

  // force any data needed to statically intermediate test steps
  result[2][1] = "present";

  return result;
}
```

## Decent test cases:

- abcde, vwxyz
- cigar, clang
- bible, abbey
- swiss, bless
