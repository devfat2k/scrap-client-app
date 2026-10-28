#!/usr/bin/env bun
/**
 * EventHub SVG to React Native Component Generator
 * Scans assets/svgs/ and generates optimized React Native SVG components in app/components/Svg/icons/
 */

import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs"
import { join, extname } from "node:path"

const SVG_INPUT_DIR = join(process.cwd(), "assets", "svgs")
const SVG_OUTPUT_DIR = join(process.cwd(), "app", "components", "Svg", "icons")

// Map SVG XML tag names to react-native-svg components
const TAG_MAP: Record<string, string> = {
  svg: "Svg",
  path: "Path",
  circle: "Circle",
  rect: "Rect",
  g: "G",
  defs: "Defs",
  clippath: "ClipPath",
  clipPath: "ClipPath",
  lineargradient: "LinearGradient",
  linearGradient: "LinearGradient",
  radialgradient: "RadialGradient",
  radialGradient: "RadialGradient",
  stop: "Stop",
  polygon: "Polygon",
  polyline: "Polyline",
  line: "Line",
  ellipse: "Ellipse",
  mask: "Mask",
  use: "Use",
  symbol: "Symbol",
  text: "Text",
  tspan: "TSpan",
}

// Map SVG kebab-case attributes to camelCase JSX props
const ATTR_MAP: Record<string, string> = {
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-miterlimit": "strokeMiterlimit",
  "stroke-dasharray": "strokeDasharray",
  "stroke-dashoffset": "strokeDashoffset",
  "stroke-opacity": "strokeOpacity",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
  "clip-path": "clipPath",
  "fill-opacity": "fillOpacity",
  "stop-color": "stopColor",
  "stop-opacity": "stopOpacity",
  "font-size": "fontSize",
  "font-family": "fontFamily",
  "font-weight": "fontWeight",
  "text-anchor": "textAnchor",
}

/**
 * Converts a filename (e.g. 'arrow-left' or 'calendar_check') to PascalCase with 'Icon' suffix
 */
function toComponentName(filename: string): string {
  const cleanName = filename
    .replace(/\.svg$/i, "")
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^([a-z])/, (_, chr) => chr.toUpperCase())

  return cleanName.endsWith("Icon") ? cleanName : `${cleanName}Icon`
}

/**
 * Transforms an SVG string into a valid React Native SVG JSX component
 */
function transformSvg(svgContent: string, componentName: string): string {
  // Extract viewBox if present, default to 0 0 24 24
  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/)
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24"

  // Remove XML header, doctype, comments, and outer <svg> wrapper
  let innerContent = svgContent
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<svg[\s\S]*?>/i, "")
    .replace(/<\/svg>/i, "")
    .trim()

  // Track used imports
  const usedElements = new Set<string>(["Svg", "SvgProps"])

  // Convert SVG tag names
  innerContent = innerContent.replace(/<(\/)?([a-zA-Z0-9_-]+)/g, (match, closing, tagName) => {
    const lower = tagName.toLowerCase()
    const mapped = TAG_MAP[lower] || TAG_MAP[tagName]
    if (mapped) {
      usedElements.add(mapped)
      return `<${closing || ""}${mapped}`
    }
    return match
  })

  // Convert SVG attributes
  for (const [kebab, camel] of Object.entries(ATTR_MAP)) {
    const regex = new RegExp(`\\s${kebab}=`, "g")
    innerContent = innerContent.replace(regex, ` ${camel}=`)
  }

  // Remove unnecessary XML attributes
  innerContent = innerContent
    .replace(/\sxmlns(:[a-zA-Z0-9]+)?=["'][^"']*["']/g, "")
    .replace(/\sclass=["'][^"']*["']/g, "")
    .replace(/\sversion=["'][^"']*["']/g, "")

  // Format colors: replace static non-none colors with {color} prop if desired
  // If fill="currentColor" or fill="#..." and not none/url, map to {color}
  innerContent = innerContent
    .replace(/fill=["']currentColor["']/g, "fill={color}")
    .replace(/stroke=["']currentColor["']/g, "stroke={color}")

  const importsList = Array.from(usedElements).filter((e) => e !== "Svg" && e !== "SvgProps")
  const subImports =
    importsList.length > 0 ? `, { ${importsList.sort().join(", ")}, SvgProps }` : ", { SvgProps }"

  return `import Svg${subImports} from "react-native-svg"

export interface ${componentName}Props extends SvgProps {
  size?: number
  color?: string
}

export function ${componentName}({
  size = 24,
  color = "currentColor",
  ...props
}: ${componentName}Props) {
  return (
    <Svg width={size} height={size} viewBox="${viewBox}" fill="none" {...props}>
      ${innerContent}
    </Svg>
  )
}
`
}

function run() {
  console.log("🚀 Starting SVG component generation...")

  if (!existsSync(SVG_INPUT_DIR)) {
    mkdirSync(SVG_INPUT_DIR, { recursive: true })
    console.log(`📁 Created input directory: ${SVG_INPUT_DIR}`)
  }

  if (!existsSync(SVG_OUTPUT_DIR)) {
    mkdirSync(SVG_OUTPUT_DIR, { recursive: true })
    console.log(`📁 Created output directory: ${SVG_OUTPUT_DIR}`)
  }

  const files = readdirSync(SVG_INPUT_DIR).filter((f) => extname(f).toLowerCase() === ".svg")

  if (files.length === 0) {
    console.log(
      "ℹ️  No .svg files found in assets/svgs/. Place your .svg files there to generate components.",
    )
    return
  }

  let count = 0
  for (const file of files) {
    const filePath = join(SVG_INPUT_DIR, file)
    const rawContent = readFileSync(filePath, "utf-8")
    const componentName = toComponentName(file)
    const outputFilePath = join(SVG_OUTPUT_DIR, `${componentName}.tsx`)

    const tsxCode = transformSvg(rawContent, componentName)
    writeFileSync(outputFilePath, tsxCode, "utf-8")
    console.log(`  ✓ Generated ${componentName}.tsx from ${file}`)
    count++
  }

  console.log(`✨ Successfully generated ${count} SVG component(s) in app/components/Svg/icons/\n`)
}

run()
