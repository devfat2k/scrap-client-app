// PostToolUse hook: run `eslint --fix` on the file Claude just edited.
// Exit 2 feeds remaining lint errors back to Claude (the edit itself is already done).
import { spawnSync } from "node:child_process"

let raw = ""
for await (const chunk of process.stdin) raw += chunk

let file
try {
  file = JSON.parse(raw || "{}")?.tool_input?.file_path
} catch {
  process.exit(0)
}

const inScope = /[\\/](app|scripts|test)[\\/]/.test(file ?? "")
const isCode = /\.(ts|tsx|js|jsx)$/.test(file ?? "")
const isGenerated = /[\\/]generated[\\/]/.test(file ?? "")
if (!file || !inScope || !isCode || isGenerated) process.exit(0)

const result = spawnSync("bunx", ["eslint", "--fix", file], { encoding: "utf8" })
if (result.status !== 0) {
  process.stderr.write(`${result.stdout || ""}${result.stderr || ""}`)
  process.exit(2)
}
