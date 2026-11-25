// The GPS Swears It Was a Shortcut — make.fun entry.
// Writes the GPS's one-line excuse to $OUTPUT_DIR/entry.txt (default /output).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The map called that lake a shortcut and I believed it — I follow satellites, not common sense, and your sedan is not a boat.";

// Gate: exactly one non-empty line, 1–200 Unicode code points.
const codePoints = [...LINE].length;
if (LINE.length === 0 || LINE.trim().length === 0) {
  throw new Error("entry line must not be empty or only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1–200 characters, got ${codePoints}`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read back and fail hard if the file is not byte-for-byte the line.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the entry line exactly");
}

console.log(`Wrote ${codePoints} characters to ${outPath}`);
