import { log } from "../utils/helpers.ts";
import * as F from "../utils/functional.ts";

export const test_input = ``;

export function part1(input: string[]): number {
    // Example: count lines
    return input.filter(l => l).length;
}

export function part2(input: string[]): number {
    // Example: sum line lengths using functional utility
    return F.sum(input.map(line => line.length));
}
