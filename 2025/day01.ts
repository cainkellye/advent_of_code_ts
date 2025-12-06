import { log } from "../utils/helpers.ts";
import * as F from "../utils/functional.ts";

export const test_input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

export function part1(input: string[]): number {
    let dial = new Dial(50);
    input.map(dial.rotate);
    return dial.zero_state_count();
}

export function part2(input: string[]): number {
    let dial = new Dial(50);
    input.map(dial.rotate);
    return dial.zero_state_count(true);
}

class Dial {
    private state: number = 50;
    readonly max: number = 99;
    private count_zero: number = 0;
    private count_zero_passthrough: number = 0;

    constructor(initialState: number) {
        this.state = initialState;
        this.rotate = this.rotate.bind(this);
    }

    public rotate(rotation: string) {
        const num: number = parseInt(rotation.slice(1), 10);
        const z_before = this.count_zero_passthrough;
        if (rotation[0] === 'L') {
            this.rotate_left(num);
        } else {
            this.rotate_right(num);
        }
        let pointed_at_zero = this.count_zero_passthrough - z_before;
        log(`- The dial is rotated ${rotation} to point ${this.state}${pointed_at_zero > 0 ? '; during this rotation, it points at 0 ' + pointed_at_zero + ' times.' : ''}`);

        if (this.state == 0) {
            this.count_zero += 1;
            log(`  count_zero: ${this.count_zero})`)
        }
    }

    private rotate_left(n: number) {
        if (this.state == 0) {
            // this does not count as passthrough, start from 100
            this.state = 100;
        }
        this.state -= n;
        while (this.state < 0) {
            this.count_zero_passthrough += 1;
            this.state += this.max + 1;
        }
    }

    private rotate_right(n: number) {
        this.state += n;
        while (this.state > this.max) {
            this.count_zero_passthrough += 1;
            this.state -= this.max + 1;
            if (this.state == 0) {
                // this does not count as passthrough
                this.count_zero_passthrough -= 1;
            }
        }
    }

    public zero_state_count(with_passthrough: boolean = false) {
        return this.count_zero + (with_passthrough ? this.count_zero_passthrough : 0);
    }
}
