#!/usr/bin/env bun
/**
 * EventHub Unused Assets Checker
 * Scans assets/ and checks references across app/, assets/ and app.json
 * Identifies orphaned icons, images, and SVGs, calculating potential space savings.
 */

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs"
import { join, basename, extname } from "node:path"

const ASSET_DIRS = [
  { dir: join(process.cwd(), "assets", "icons"), type: "icon" },
  { dir: join(process.cwd(), "assets", "images"), type: "image" },
  { dir: join(process.cwd(), "assets", "svgs"), type: "svg" },
]

const SEARCH_DIRS = [join(process.cwd(), "app"), join(process.cwd(), "assets")]

const APP_JSON = join(process.cwd(), "app.json")

interface UnusedAsset {
  filename: string
  fullPath: string
  type: string
  associatedFiles: string[]
  totalBytes: number
}

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  if (!existsSync(dir)) return fileList
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      getAllFiles(fullPath, fileList)
    } else if (entry.isFile()) {
      fileList.push(fullPath)
    }
  }
  return fileList
}

function getFileSize(filePath: string): number {
  try {
    return statSync(filePath).size
  } catch {
    return 0
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  const mb = kb / 1024
  return `${mb.toFixed(2)} MB`
}

export function findUnusedAssets(): UnusedAsset[] {
  // Collect all searchable source contents
  const sourceFiles = SEARCH_DIRS.flatMap((d) =>
    getAllFiles(d).filter((f) => /\.(tsx?|jsx?|json)$/i.test(f) && !f.endsWith("/index.ts")),
  )

  if (existsSync(APP_JSON)) {
    sourceFiles.push(APP_JSON)
  }

  const sourcesContent = sourceFiles.map((file) => readFileSync(file, "utf-8")).join("\n")

  const unused: UnusedAsset[] = []

  for (const { dir, type } of ASSET_DIRS) {
    if (!existsSync(dir)) continue

    const allFilesInDir = readdirSync(dir)
    const baseFiles = allFilesInDir.filter((file) => {
      // Exclude generated index files and scaled variants
      if (file === "index.ts" || file === ".DS_Store") return false
      if (/@\d+x\.[a-zA-Z0-9]+$/i.test(file)) return false
      return true
    })

    for (const baseFile of baseFiles) {
      const fullPath = join(dir, baseFile)
      const nameWithoutExt = basename(baseFile, extname(baseFile))

      // Variations to search for: exact name, name without ext, camelCase
      const camelName = nameWithoutExt
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^([A-Z])/, (_, chr) => chr.toLowerCase())

      const patterns = [
        baseFile,
        `"${nameWithoutExt}"`,
        `'${nameWithoutExt}'`,
        `\`${nameWithoutExt}\``,
        `icon="${nameWithoutExt}"`,
        `icon: "${nameWithoutExt}"`,
        `icon: '${nameWithoutExt}'`,
        `"${camelName}"`,
        `'${camelName}'`,
        nameWithoutExt,
      ]

      const isUsed = patterns.some((p) => sourcesContent.includes(p))

      if (!isUsed) {
        // Find associated @2x, @3x variants
        const ext = extname(baseFile)
        const associatedVariants = allFilesInDir.filter((f) => {
          if (f === baseFile) return true
          const prefix = f.replace(/@\d+x\.[a-zA-Z0-9]+$/i, "")
          return prefix === nameWithoutExt && extname(f) === ext
        })

        const totalBytes = associatedVariants.reduce((sum, f) => sum + getFileSize(join(dir, f)), 0)

        unused.push({
          filename: baseFile,
          fullPath,
          type,
          associatedFiles: associatedVariants.map((f) => join(dir, f)),
          totalBytes,
        })
      }
    }
  }

  return unused
}

function run() {
  console.log("🔍 Scanning for unused assets across project...\n")
  const unused = findUnusedAssets()

  if (unused.length === 0) {
    console.log("🎉 Great job! No unused assets found.")
    return
  }

  console.log(`⚠️  Found ${unused.length} unused asset(s):\n`)
  console.log("----------------------------------------------------------------------")
  console.log(
    `${"Asset Name".padEnd(35)} ${"Type".padEnd(8)} ${"Files".padEnd(8)} ${"Size".padStart(10)}`,
  )
  console.log("----------------------------------------------------------------------")

  let grandTotalBytes = 0

  for (const item of unused) {
    grandTotalBytes += item.totalBytes
    const name = item.filename.length > 33 ? item.filename.slice(0, 30) + "..." : item.filename
    const fileCount = `${item.associatedFiles.length} file(s)`
    const size = formatBytes(item.totalBytes)
    console.log(
      `${name.padEnd(35)} ${item.type.padEnd(8)} ${fileCount.padEnd(8)} ${size.padStart(10)}`,
    )
  }

  console.log("----------------------------------------------------------------------")
  console.log(`Total space reclaimable: ${formatBytes(grandTotalBytes)}`)
  console.log("\n💡 Run `bun run clean:unused` to safely delete these assets.")
}

if (import.meta.main) {
  run()
}
