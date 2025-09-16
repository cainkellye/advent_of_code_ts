import { runDay, log, silenceDebug } from "../utils/helpers.ts";
import * as F from "../utils/functional.ts";

export function part1(input: string[]): number {
    let mem = input[0]!.split(',').map(n => parseInt(n));
    mem[1] = 12;
    mem[2] = 2;
    runIntCode(mem);
    return mem[0]!;
}

export function part2(input: string[]): number {
    silenceDebug();
    const search = 19690720;
    let mem = input[0]!.split(',').map(n => parseInt(n));
    for (let x = 0; x < 100; x++) {
        for (let y = 0; y < 100; y++) {
            let mem_x = mem.slice();
            mem_x[1] = x;
            mem_x[2] = y;
            runIntCode(mem_x);
            if (mem_x[0] === search) {
                return x * 100 + y;
            }
        }
    }
    // Example: sum line lengths using functional utility
    return 99999;
}


function runIntCode(mem: number[]): void {
    log(mem);
    let ip = 0;
    while (ip < mem.length) {
        const op = processCode(mem[ip]!);
        if (op === haltOperation) {
            log("HALT");
            return;
        }
        op(mem.slice(ip + 1, ip + 4), mem);
        log(mem);
        ip += 4;
    }
    throw new Error("IP out of range");
}

type operation = (params: number[], mem: number[]) => void;

export function processCode(intCode: number): operation {
    switch (intCode) {
        case 1: return addOperation;
        case 2: return mulOperation;
        default: return haltOperation;
    }
}

function haltOperation(params: number[], mem: number[]): void {
    // no op
}

function addOperation(params: number[], mem: number[]): void {
    if (params.length != 3) {
        throw new Error(`Param count mismatch: ${params}`);
    }
    if (F.max(params) >= mem.length) {
        throw new Error("Invalid memory address");
    }
    const x = mem[params[0]!]!;
    const y = mem[params[1]!]!;
    mem[params[2]!] = x + y;
    log(`@ADD mem[${params[2]}] = ${x} + ${y} = ${mem[params[2]!]}`)
}

function mulOperation(params: number[], mem: number[]): void {
    if (params.length != 3) {
        throw new Error(`Param count mismatch: ${params}`);
    }
    if (F.max(params) >= mem.length) {
        throw new Error("Invalid memory address");
    }
    const x = mem[params[0]!]!;
    const y = mem[params[1]!]!;
    mem[params[2]!] = x * y;
    log(`@MUL mem[${params[2]}] = ${x} * ${y} = ${mem[params[2]!]}`)
}


// To run this day directly
if (import.meta.main) {
    runDay(part1, part2, import.meta.url);
}

