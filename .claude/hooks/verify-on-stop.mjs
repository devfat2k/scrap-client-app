// Stop hook: verify TypeScript compilation before Claude finishes a turn with modified app code.
// Exit 2 feeds compile errors back to Claude so they are fixed before handing back to the user.
import { spawnSync } from "node:child_process"

// Check if any app code is modified
const status = spawnSync("git", ["status", "--porcelain", "app/"], { encoding: "utf8" })
const hasAppChanges = Boolean(status.stdout?.trim())

if (!hasAppChanges) {
  process.exit(0)
}

// Verify TypeScript compilation
const compile = spawnSync("bun", ["run", "compile"], { encoding: "utf8" })
if (compile.status !== 0) {
  process.stderr.write(`[Stop Hook Error] TypeScript compile failed on modified code:\n${compile.stdout || ""}${compile.stderr || ""}\nPlease fix the compile errors above before completing.`)
  process.exit(2)
}

process.exit(0)
