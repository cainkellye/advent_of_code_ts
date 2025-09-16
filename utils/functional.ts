export function* range(start: number, end: number, step = 1): Generator<number> {
    if (step === 0) throw new Error("range() step cannot be 0");

    if (step > 0) {
        for (let i = start; i < end; i += step) {
            yield i;
        }
    } else {
        for (let i = start; i > end; i += step) {
            yield i;
        }
    }
}

export function zip<A, B>(a: A[], b: B[]): [A, B][] {
    const minLength = Math.min(a.length, b.length);
    return Array.from({ length: minLength }, (_, i) => [a[i]!, b[i]!]);
}

export function unzip<A, B>(pairs: [A, B][]): [A[], B[]] {
    return [pairs.map(p => p[0]), pairs.map(p => p[1])];
}

export function chunk<T>(arr: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );
}

export const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
export const product = (arr: number[]) => arr.reduce((a, b) => a * b, 1);

export const max = (arr: number[]) => arr.reduce((a, b) => Math.max(a, b));
export const min = (arr: number[]) => arr.reduce((a, b) => Math.min(a, b));

// Additional useful utilities for AoC
export function count<T>(arr: T[], predicate: (item: T) => boolean): number {
    return arr.filter(predicate).length;
}

export function unique<T>(arr: T[]): T[] {
    return [...new Set(arr)];
}

export function groupBy<T, K extends string | number | symbol>(
    arr: T[],
    keyFn: (item: T) => K
): Record<K, T[]> {
    return arr.reduce((groups, item) => {
        const key = keyFn(item);
        (groups[key] = groups[key] || []).push(item);
        return groups;
    }, {} as Record<K, T[]>);
}

export function transpose<T>(matrix: T[][]): T[][] {
    if (matrix.length === 0) return [];
    return matrix[0]!.map((_, i) => matrix.map(row => row[i]!));
}

