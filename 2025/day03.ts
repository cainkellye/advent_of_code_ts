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
    log(`Processing bank: ${bank}`);
    let selected = [];
    let startFromIdx = 0;
    for (let d = 0; d < digits; d++) {
        const part = bank.substring(startFromIdx, bank.length - (digits - d - 1));
        log(part);
        let [c, i] = biggest(part);
        selected.push(c);
        startFromIdx += i + 1;
        log(selected, startFromIdx);
    }
    const joltage = parseInt(selected.join(''));
    log(`Joltage: ${joltage}`);
    return joltage;
}

function biggest(s: string): [string, number] {
    let b: [string, number] = ['0', -1];
    for (let i = 0; i < s.length; i++) {
        if (s[i]! > b[0]) {
            b = [s[i]!, i];
        }
    }
    if (b[1] == -1) {
        log("Error, biggest not found. " + s);
    }
    return [b[0], b[1]];
}
