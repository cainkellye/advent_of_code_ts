import { log } from "../utils/helpers.ts";
// import * as F from "../utils/functional.ts";

export function runIntCode(mem: number[]): number[] {
    log(mem);
    let ip = 0;
    while (ip < mem.length) {
        let [opCode, p1, p2, p3] = mem.slice(ip, ip + 4);
        if (opCode === undefined || p1 === undefined || p2 === undefined || p3 === undefined) {
            throw new Error(`Memory error: ${opCode}, ${p1}, ${p2}, ${p3}`);
        }
        switch (opCode) {
            case 1: mem[p3] = mem[p1]! + mem[p2]!; break;
            case 2: mem[p3] = mem[p1]! * mem[p2]!; break;
            default: log("HALT"); return mem;
        }
        log(mem);
        ip += 4;
    }
    throw new Error("IP out of range");
}

export function parseIntCode(input: string | undefined): number[] {
    if (!input) throw new Error("Input is undefined");
    let mem = input.split(',').map(n => parseInt(n));
    return mem;
}
