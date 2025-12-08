import { log } from "../utils/helpers.ts";
import * as F from "../utils/functional.ts";

export const test_input = `987654321111111
811111111111119
234234234234278
818181911112111`;

export function part1(input: string[]): number {
    return F.sum(input.map(l => find_highest_joltage(l, 2)));
}

export function part2(input: string[]): number {
    return F.sum(input.map(l => find_highest_joltage(l, 12)));
}

function find_highest_joltage(bank: string, digits: number): number {
    // log(`Processing bank: ${bank}`);
    let selected = [];
    let startIdx = 0;
    for (let d = 0; d < digits; d++) {
        let [foundDigit, foundIdx] = biggest(bank, startIdx, bank.length - startIdx - digits + d + 1);
        selected.push(foundDigit);
        startIdx = foundIdx + 1;
    }
    const joltage = parseInt(selected.join(''));
    // log(`Joltage: ${joltage}`);
    return joltage;
}

function biggest(s: string, start: number, length: number): [string, number] {
    // log(`Start: ${start}, length: ${length} `, () => s.substring(start, start + length));
    let b: [string, number] = ['0', -1];
    for (let i = start; i < start + length; i++) {
        if (s[i]! > b[0]) {
            b = [s[i]!, i];
        }
    }
    return [b[0], b[1]];
}
