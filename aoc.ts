// Usage:
// bun run run.ts 2025 01            -> runs both parts
// bun run run.ts 2025 01 1          -> runs only part1
// bun run run.ts 2025 01 time       -> runs both parts with timing
// bun run run.ts 2025 01 2 time     -> runs only part2 with timing

const [, , year, day, part, maybeTime] = Bun.argv;
const timed = part === "time" || maybeTime === "time";

let actualPart = part;
if (part === "time") actualPart = undefined;

if (!year || !day) {
  console.error("Usage: bun run run.ts <year> <day> [part] [time]");
  process.exit(1);
}

const modulePath = `./${year}/day${day}.ts`;
const mod = await import(modulePath);

const { readInputCached, log, silenceDebug } = await import("./utils/helpers.ts");
const input = await readInputCached(year, day);

if (timed) {
    silenceDebug();
}

function runWithTiming(label: string, fn: (inp: string[]) => any) {
  if (!timed) {
    console.log(`${label}:`, fn(input));
    return;
  }
  const t0 = performance.now();
  const result = fn(input);
  const t1 = performance.now();
  console.log(`${label}:`, result, `(took ${(t1 - t0).toFixed(2)} ms)`);
}

log("debug log enabled");

if (!actualPart || actualPart === "1") {
  runWithTiming(`Year ${year}, Day ${day}, Part 1`, mod.part1);
}
if (!actualPart || actualPart === "2") {
  runWithTiming(`Year ${year}, Day ${day}, Part 2`, mod.part2);
}

// Make this file a module to allow top-level await. (Not needed in Bun, but for consistency.)
export {};

