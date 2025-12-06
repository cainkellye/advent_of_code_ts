// Usage:
// bun aoc 2025 01            -> runs both parts
// bun aoc 2025 01 1          -> runs only part1
// bun aoc 2025 01 time       -> runs both parts with timing
// bun aoc 2025 01 2 time     -> runs only part2 with timing
// bun aoc 2025 01 test       -> runs both parts using the test_input from the day
// bun aoc 2025 01 2 test     -> runs only part2 using the test_input from the day

const [, , year, day, part, testOrTime] = Bun.argv;
const timed = part === "time" || testOrTime === "time";
const test = part === "test" || testOrTime === "test";

let actualPart = part;
if (part === "time") actualPart = undefined;

if (!year || !day) {
    console.error("Usage: bun aoc <year> <day> [part] [time]");
    process.exit(1);
}

const modulePath = `./${year}/day${day}.ts`;
const mod = await import(modulePath);

const { readInputCached, log, silenceDebug } = await import("./utils/helpers.ts");
const input = test ? mod.test_input.split('\n') : await readInputCached(year, day);

if (timed) {
    silenceDebug();
}

function runWithTiming(label: string, fn: (inp: string[]) => any) {
    if (!timed) {
        console.log(`${label}:`, fn(input));
        return;
    }
    const t0 = performance.now();
    let result = fn(input);
    const t1 = performance.now();
    for (let t = 0; t < 10; t++) {
        fn(input);
    }
    const t2 = performance.now();
    console.log(`${label}:`, result, `took ${((t2 - t1) / 10).toFixed(2)} ms (average of 10), with a cold run of ${(t1 - t0).toFixed(2)} ms`);
}

log("debug log enabled");

if (!actualPart || actualPart.slice(-1) === "1") {
    runWithTiming(`Year ${year}, Day ${day}, Part 1`, mod.part1);
}
if (!actualPart || actualPart.slice(-1) === "2") {
    runWithTiming(`Year ${year}, Day ${day}, Part 2`, mod.part2);
}

