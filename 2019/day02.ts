import { runDay, log, silenceDebug } from "../utils/helpers.ts";
import * as IntCode from "./intCode.ts";

export function part1(input: string[]): number {
    let mem = IntCode.parseIntCode(input[0]);
    mem[1] = 12;
    mem[2] = 2;
    IntCode.runIntCode(mem);
    return mem[0]!;
}

export function part2(input: string[]): number {
    silenceDebug();
    const search = 19690720;
    let mem = IntCode.parseIntCode(input[0]);
    for (let x = 0; x < 100; x++) {
        for (let y = 0; y < 100; y++) {
            let mem_x = mem.slice(); // clone the memory
            mem_x[1] = x;
            mem_x[2] = y;
            mem_x = IntCode.runIntCode(mem_x);
            if (mem_x[0] === search) {
                return x * 100 + y;
            }
        }
    }
    throw new Error("Search value was not found.");
}

// To run this day directly
if (import.meta.main) {
    runDay(part1, part2, import.meta.url);
}

