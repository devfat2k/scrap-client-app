#!/usr/bin/env bun
/**
 * EventHub Image & Icon Assets Index Generator
 * Scans assets/icons/ and assets/images/ (filtering out @2x, @3x variants)
 * Generates type-safe index files in assets/icons/index.ts and assets/images/index.ts
 * and synchronizes iconRegistry in app/components/Icon.tsx
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs"
import { join, basename, extname } from "node:path"

const ICONS_DIR = join(process.cwd(), "assets", "icons")
const IMAGES_DIR = join(process.cwd(), "assets", "images")
const ICON_COMPONENT_FILE = join(process.cwd(), "app", "components", "Icon.tsx")

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"])

/**
 * Converts kebab-case, snake_case or filename to camelCase key
 */
function toCamelCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^([A-Z])/, (_, chr) => chr.toLowerCase())
}

/**
 * Filter out @2x and @3x scaled image files and return only 1x base assets
 */
function getBaseAssets(dir: string): { key: string; filename: string }[] {
  if (!existsSync(dir)) return []

  const files = readdirSync(dir).filter((f) => {
    const ext = extname(f).toLowerCase()
    if (!IMAGE_EXTENSIONS.has(ext)) return false
    // Skip @2x, @3x, @4x
    if (/@\d+x\.[a-zA-Z0-9]+$/i.test(f)) return false
    return true
  })

  return files.map((filename) => {
    const nameWithoutExt = basename(filename, extname(filename))
    return {
      key: toCamelCase(nameWithoutExt),
      filename,
    }
  })
}

function generateIconsIndex() {
  const assets = getBaseAssets(ICONS_DIR)
  const outputFile = join(ICONS_DIR, "index.ts")

  const entries = assets
    .map(({ key, filename }) => `  ${key}: require("./${filename}"),`)
    .join("\n")

  const content = `/**
 * Auto-generated Icons Index
 * Run \`bun run gen:assets\` to regenerate.
 */

export const iconImages = {
${entries}
} as const

export type IconImageName = keyof typeof iconImages
`

  writeFileSync(outputFile, content, "utf-8")
  console.log(`  ✓ Generated assets/icons/index.ts with ${assets.length} icon(s)`)

  // Update app/components/Icon.tsx if exists
  if (existsSync(ICON_COMPONENT_FILE)) {
    let iconContent = readFileSync(ICON_COMPONENT_FILE, "utf-8")
    const registryEntries = assets
      .map(({ key, filename }) => `  ${key}: require("@assets/icons/${filename}"),`)
      .join("\n")

    const newRegistry = `export const iconRegistry = {\n${registryEntries}\n}`
    const registryRegex = /export const iconRegistry = \{[\s\S]*?\n\}/

    if (registryRegex.test(iconContent)) {
      iconContent = iconContent.replace(registryRegex, newRegistry)
      writeFileSync(ICON_COMPONENT_FILE, iconContent, "utf-8")
      console.log(`  ✓ Synchronized iconRegistry in app/components/Icon.tsx`)
    }
  }
}

function generateImagesIndex() {
  const assets = getBaseAssets(IMAGES_DIR)
  const outputFile = join(IMAGES_DIR, "index.ts")

  const entries = assets
    .map(({ key, filename }) => `  ${key}: require("./${filename}"),`)
    .join("\n")

  const content = `/**
 * Auto-generated Images Index
 * Run \`bun run gen:assets\` to regenerate.
 */

export const images = {
${entries}
} as const

export type ImageName = keyof typeof images
`

  writeFileSync(outputFile, content, "utf-8")
  console.log(`  ✓ Generated assets/images/index.ts with ${assets.length} image(s)`)
}

function run() {
  console.log("🚀 Generating Image and Icon asset registries...")
  generateIconsIndex()
  generateImagesIndex()
  console.log("✨ Assets generation complete!\n")
}

run()
