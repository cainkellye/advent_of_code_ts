# Advent of Code - TypeScript/Bun

An Advent of Code setup using TypeScript and Bun.

## Setup

To install dependencies:
```bash
bun install
```

## Project Structure

```
aoc.ts                # Main runner script
utils/
  helpers.ts          # Input reading utilities
  functional.ts       # Functional programming utilities
inputs/
  YYYY/
    inputDD.txt       # Input files (YYYY=year, DD=day)
YYYY/
  dayDD.ts            # Solution files (YYYY=year, DD=day)
```

## Usage

The runner script supports several modes:

```bash
# Run both parts
bun aoc.ts 2025 01

# Run only part 1
bun aoc.ts 2025 01 1

# Run only part 2
bun aoc.ts 2025 01 2

# Run with timing
bun aoc.ts 2025 01 time
bun aoc.ts 2025 01 1 time
bun aoc.ts 2025 01 2 time
```

## Creating New Solutions

1. Create solution file: `YYYY/dayDD.ts`

2. (Opt.) Create input file: `inputs/YYYY/inputDD.txt`
  
  *Inputs are automatically downloaded when the `AOC_SESSION_TOKEN` environment variable is set correctly.*


Use the template in `2025/day00.ts` as a starting point.

```typescript
import { runDay, log } from "../utils/helpers.ts";
import * as F from "../utils/functional.ts";

export function part1(input: string[]): number {
    // Example: count lines
    return input.filter(l => l).length;
}

export function part2(input: string[]): number {
  // Example: sum line lengths using functional utility
  return F.sum(input.map(line => line.length));
}

// To run this day directly
if (import.meta.main) {
    runDay(part1, part2, import.meta.url);
}
```

## Utilities

### helpers.ts
- `readInput(year, day)` - Read input file as string array
- `readNumbers(year, day)` - Read input file as number array
- `readInputCached(year, day)` - Fetch input from AOC website, cache locally, and read input file as string array
- `parseFileInfo(filePath)` - Parse year and day from the file path
. `runDay` - Helper for running a day file directly (keeps the day template short and static)
- `log()` - Debug logger

### functional.ts
- `range(start, end, step?)` - Generate number sequences
- `zip(a, b)` - Combine two arrays
- `unzip(pairs)` - Split array of pairs
- `chunk(arr, size)` - Split array into chunks
- `sum(numbers)` - Sum array of numbers
- `product(numbers)` - Product of array of numbers
- `count(arr, predicate)` - Count items matching predicate
- `unique(arr)` - Remove duplicates
- `groupBy(arr, keyFn)` - Group array by key function
- `transpose(matrix)` - Transpose 2D array

## TypeScript Configuration

The project uses modern TypeScript with:
- ESNext modules with bundler resolution
- Top-level await support
- Dynamic imports
- Strict type checking
- Import with .ts extensions enabled

---

This project was created using `bun init` with [Bun](https://bun.com) v1.2.21+.
