import { runDay, log } from "../utils/helpers.ts";
import * as F from "../utils/functional.ts";

export function part1(input: string[]): number {
    return input.map(line => Math.floor(parseInt(line) / 3) - 2).reduce((x, y) => x + y);
}

export function part2(input: string[]): number {
    return F.sum(input.map(line => fuelCost(parseInt(line))));
}

function fuelCost(mass: number): number {
    const fuel = Math.floor(mass / 3) - 2;
    if (fuel <= 0) return 0;
    return fuel + fuelCost(fuel);
}

// To run this day directly
if (import.meta.main) {
    runDay(part1, part2, import.meta.url);
}

