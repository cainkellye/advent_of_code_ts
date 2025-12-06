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
    // Example: sum line lengths using functional utility
    return F.sum(input.map(line => line.length));
}

class Dial {
    private state: number = 50;
    readonly limit: number = 100;
    private count_zero: number = 0;

    constructor(initialState: number) {
        this.state = initialState;
        this.count_zero = 0;
        this.rotate = this.rotate.bind(this);
    }

    public rotate(rotation: string) {
        const num: number = parseInt(rotation.slice(1), 10);
        if (rotation[0] === 'L') {
            this.rotate_left(num);
        } else {
            this.rotate_right(num);
        }

        if (this.state == 0) {
            this.count_zero += 1;
        }
    }

    private rotate_left(n: number) {
        this.state -= n;
        while (this.state < 0) {
            this.state += this.limit;
        }
    }

    private rotate_right(n: number) {
        this.state += n;
        while (this.state >= this.limit) {
            this.state -= this.limit;
        }
    }

    public zero_state_count() {
        return this.count_zero;
    }
}
