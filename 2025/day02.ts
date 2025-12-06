import { log } from "../utils/helpers.ts";
import * as F from "../utils/functional.ts";

export const test_input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

export function part1(input: string[]): number {
    const id_ranges = ranges(input[0]!);
    log(id_ranges);

    let invalid_ids: number[] = [];
    for (let range of id_ranges) {
        const invalid_in_range = invalid_ids_in_range(range[0]!, range[1]!);
        log(`Invalid ids in range ${range} = ${invalid_in_range}`);
        invalid_ids = invalid_ids.concat(invalid_in_range);
    }
    return F.sum(invalid_ids);
}

export function part2(input: string[]): number {
    // Example: sum line lengths using functional utility
    return F.sum(input.map(line => line.length));
}

function ranges(input_line: string): number[][] {
    let ranges = input_line.split(',',).map(range => range.split('-').map(r => parseInt(r)));
    return ranges;
}

function invalid_ids_in_range(start: number, end: number): number[] {
    let invalids = [];
    for (let current = start; current <= end; current++) {
        if (id_repeats_digits(current)) {
            invalids.push(current);
        }
    }
    return invalids;
}

function id_repeats_digits(id: number): boolean {
    // 1. Calculate number of digits (N) using base-10 logarithm.
    const N = Math.floor(Math.log10(id)) + 1;

    // 2. Must have an even length (XX pattern).
    if (N % 2 !== 0) {
        return false;
    }

    // 3. Determine the power of 10 needed to split the ID.
    const halfLength = N / 2;
    // X = 10^(N/2). For 123123, X = 1000.
    const X = Math.pow(10, halfLength);

    // 4. Calculate the two halves.
    // A (First Half): The quotient of ID / X.
    const firstHalf = Math.floor(id / X);
    // B (Second Half): The remainder of ID / X.
    const secondHalf = id % X;

    // 5. The ID is invalid if the two halves are equal.
    return firstHalf === secondHalf;
}
