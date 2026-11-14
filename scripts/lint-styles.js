#!/usr/bin/env node

/**
 * Script to run ESLint specifically for styling rules
 * Usage: node scripts/lint-styles.js [path]
 */

const { execSync } = require("child_process")
//const path = require("path")

const targetPath = process.argv[2] || "app/"

console.log("🔍 Running ESLint styling rules...")
console.log(`📁 Target: ${targetPath}`)
console.log("")

try {
  const command = `npx eslint ${targetPath} --ext .ts,.tsx,.js,.jsx --format=stylish`
  const output = execSync(command, {
    stdio: "pipe",
    encoding: "utf8",
    cwd: process.cwd(),
  })

  console.log("✅ No styling issues found!")
  console.log(output)
} catch (error) {
  console.log("❌ Styling issues found:")
  console.log(error.stdout || error.message)
  process.exit(1)
}
