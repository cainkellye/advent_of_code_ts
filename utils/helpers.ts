import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";

export function readInput(year: string, day: string): string[] {
  const file = join("inputs", year, `input${day}.txt`);
  return readFileSync(file, "utf8").trimEnd().split("\n");
}

// Convert input lines to numbers
export function readNumbers(year: string, day: string): number[] {
  return readInput(year, day).map(Number);
}

/*
Get your session token:
- Log into adventofcode.com
- Open browser dev tools (F12)
- Go to Application/Storage → Cookies → https://adventofcode.com
- Copy the value of the session cookie

# Create .env file
echo AOC_SESSION_TOKEN=your_session_token_here > .env

# Or export directly
export AOC_SESSION_TOKEN=your_session_token_here
*/

// Fetch input from Advent of Code website
async function readInputWeb(year: string, day: string): Promise<string[]> {
    const sessionToken = process.env.AOC_SESSION_TOKEN;
    if (!sessionToken) {
        throw new Error("AOC_SESSION_TOKEN environment variable is required. Get it from your browser cookies when logged into adventofcode.com");
    }

    const url = `https://adventofcode.com/${year}/day/${parseInt(day)}/input`;

    try {
        const response = await fetch(url, {
            headers: {
                'Cookie': `session=${sessionToken}`,
                'User-Agent': 'advent-of-code-ts by cainkellye@github.com'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch input: ${response.status} ${response.statusText}`);
        }

        const text = await response.text();
        return text.trimEnd().split('\n');
    } catch (error) {
        throw new Error(`Failed to fetch input from web: ${error}`);
    }
}

// Fetch and cache input (downloads once, then reads from file)
export async function readInputCached(year: string, day: string): Promise<string[]> {
    const file = join("inputs", year, `input${day}.txt`);

    // If file exists, read from cache
    if (existsSync(file)) {
        return readInput(year, day);
    }

    // Otherwise, fetch from web and cache it
    log(`Fetching input for ${year}/day${day} from web...`);
    const input = await readInputWeb(year, day);

    // Ensure directory exists
    const dir = dirname(file);
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }

    // Save to file
    writeFileSync(file, input.join('\n'));
    log(`Cached input to ${file}`);

    return input;
}

// Parse year and day from file path
export function parseFileInfo(filePath: string): { year: string; day: string } {
    const pathParts = filePath.split('/') || [];

    // Extract year from directory (second to last part) and day from filename
    const year = pathParts[pathParts.length - 2] || "2025";
    const dayMatch = pathParts[pathParts.length - 1]?.match(/day(\d+)\.ts$/);
    const day = dayMatch[1].padStart(2, '0') || "01";

    return { year, day };
}

// Run a day's solutions with automatic file path parsing
export async function runDay(
    part1: (input: string[]) => number,
    part2: (input: string[]) => number,
    filePath: string
): Promise<void> {
    const { year, day } = parseFileInfo(filePath);
    log(`Solutions for Year: ${year}, Day: ${day}`);
    const input = await readInputCached(year, day);

    console.log("Part 1:", part1(input));
    console.log("Part 2:", part2(input));
}

// Debug logger (can be silenced globally)
let debugSilenced = false;

export const silenceDebug = () => {
    debugSilenced = true;
};

export const log = (...args: any[]) => {
    if (debugSilenced) return;
    console.log(' $', ...args);
};
