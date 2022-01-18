# Word Match

`compare-words` is a small utility for assessing how much one word matches another.

It's inspired by [https://www.powerlanguage.co.uk/wordle/](Wordle).

## Overview

- Takes two words of any size
- The second is compared to the first
- Compares words for precise and non-precise letter matches
- Returns an array of tuples revealing the second word letters and their precision against the first

## Example

```js
import assess from "compare-words";

assess("begal", "beans");
```

**result**

```js
[
  ["b", "correct"],
  ["e", "correct"],
  ["a", "present"],
  ["n", "absent"],
  ["s", "absent"],
];
```

## Resources

- [source](./index.mjs)
- [tests](./test.mjs)
- [implementation nates](./notes.md)

Copyright @ Michael Chan
[Licensed MIT](./LICENSE)
