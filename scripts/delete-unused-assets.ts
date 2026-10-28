#!/usr/bin/env bun
/**
 * EventHub Delete Unused Assets Script
 * Deletes orphaned icons, images, and SVGs (including @2x, @3x variants)
 * Usage:
 *   bun run scripts/delete-unused-assets.ts --dry-run   (Preview deletions)
 *   bun run scripts/delete-unused-assets.ts             (Perform actual deletion)
 */

import { spawnSync } from "node:child_process"
import { unlinkSync } from "node:fs"

import { findUnusedAssets } from "./check-unused-assets"

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  const mb = kb / 1024
  return `${mb.toFixed(2)} MB`
}

function run() {
  const isDryRun = process.argv.includes("--dry-run")

  console.log(`🧹 Running Unused Assets Cleaner ${isDryRun ? "(DRY RUN)" : ""}...\n`)

  const unused = findUnusedAssets()

  if (unused.length === 0) {
    console.log("✨ No unused assets to delete.")
    return
  }

  let totalDeletedFiles = 0
  let totalFreedBytes = 0

  for (const asset of unused) {
    console.log(`📦 [${asset.type.toUpperCase()}] ${asset.filename}`)
    for (const filePath of asset.associatedFiles) {
      if (isDryRun) {
        console.log(`    [DRY-RUN WOULD DELETE] ${filePath}`)
      } else {
        try {
          unlinkSync(filePath)
          console.log(`    ✓ Deleted ${filePath}`)
        } catch (error) {
          console.error(`    ❌ Failed to delete ${filePath}:`, error)
        }
      }
      totalDeletedFiles++
    }
    totalFreedBytes += asset.totalBytes
  }

  console.log("\n----------------------------------------------------------------------")
  if (isDryRun) {
    console.log(
      `Dry run complete. ${totalDeletedFiles} file(s) would be deleted (${formatBytes(totalFreedBytes)}).`,
    )
    console.log("To delete permanently, run: `bun run clean:unused`")
  } else {
    console.log(
      `Deletion complete. Removed ${totalDeletedFiles} file(s) freeing ${formatBytes(totalFreedBytes)}.`,
    )
    console.log("\n🔄 Regenerating asset registries...")
    spawnSync("bun", ["run", "scripts/gen-images-icons.ts"], { stdio: "inherit" })
    spawnSync("bun", ["run", "scripts/generate-svg-index.ts"], { stdio: "inherit" })
    console.log("✨ Registries synchronized successfully!")
  }
}

run()
