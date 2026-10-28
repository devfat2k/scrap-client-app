#!/usr/bin/env bun
/**
 * EventHub SVG Index Generator
 * Scans app/components/Svg/icons/ and generates app/components/Svg/index.ts
 */

import { readdirSync, writeFileSync, existsSync } from "node:fs"
import { join, basename } from "node:path"

const SVG_ICONS_DIR = join(process.cwd(), "app", "components", "Svg", "icons")
const SVG_INDEX_FILE = join(process.cwd(), "app", "components", "Svg", "index.tsx")

function run() {
  console.log("🚀 Generating SVG index...")

  if (!existsSync(SVG_ICONS_DIR)) {
    console.log("ℹ️  No app/components/Svg/icons/ directory found. Skipping index generation.")
    return
  }

  const files = readdirSync(SVG_ICONS_DIR).filter((f) => f.endsWith(".tsx"))

  if (files.length === 0) {
    console.log(
      "ℹ️  No icon components found in app/components/Svg/icons/. Generating placeholder index.",
    )
    const emptyContent = `// Auto-generated SVG Icon Index
// Place .svg files in assets/svgs/ and run \`bun run gen:svg\`

export const SvgIcons = {} as const
export type SvgIconName = keyof typeof SvgIcons
`
    writeFileSync(SVG_INDEX_FILE, emptyContent, "utf-8")
    return
  }

  const components: { name: string; key: string; filename: string }[] = []

  for (const file of files) {
    const filenameNoExt = basename(file, ".tsx")
    // e.g. CalendarCheckIcon -> key 'CalendarCheck'
    const key = filenameNoExt.replace(/Icon$/, "")
    components.push({
      name: filenameNoExt,
      key,
      filename: filenameNoExt,
    })
  }

  const exportsCode = components
    .map(({ filename }) => `export * from "./icons/${filename}"`)
    .join("\n")

  const importsCode = components
    .map(({ name, filename }) => `import { ${name} } from "./icons/${filename}"`)
    .join("\n")

  const registryCode = components.map(({ key, name }) => `  ${key}: ${name},`).join("\n")

  const indexContent = `/**
 * Auto-generated SVG Icon Library Index
 * DO NOT EDIT MANUALLY - Run \`bun run gen:svg\` to update.
 */

import type { SvgProps } from "react-native-svg"

${importsCode}

${exportsCode}

export const SvgIcons = {
${registryCode}
} as const

export type SvgIconName = keyof typeof SvgIcons

export interface SvgIconProps extends SvgProps {
  name: SvgIconName
  size?: number
  color?: string
}

/**
 * Universal SvgIcon Component for rendering SVG icons dynamically by name.
 * Example: <SvgIcon name="CalendarCheck" size={24} color="#FF5A36" />
 */
export function SvgIcon({ name, size = 24, color = "currentColor", ...props }: SvgIconProps) {
  const IconComponent = SvgIcons[name]
  if (!IconComponent) return null
  return <IconComponent size={size} color={color} {...props} />
}
`

  writeFileSync(SVG_INDEX_FILE, indexContent, "utf-8")
  console.log(`✨ Generated ${SVG_INDEX_FILE} with ${components.length} SVG icon(s).\n`)
}

run()
