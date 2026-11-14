import fs from "fs"
import path from "path"

const SVG_COMPONENT_DIR = path.resolve(__dirname, "../assets/svg")
const OUT_FILE = path.join(SVG_COMPONENT_DIR, "index.ts")

/**
 * Chuyển tên file "bell_fill_active.tsx" → "BellFillActive"
 */
function toPascalCase(filename: string): string {
  return filename
    .replace(/\.tsx$/i, "")
    .split(/[_-]/)
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
    .join("")
}

// Đọc danh sách các file .tsx (component SVG)
const files = fs
  .readdirSync(SVG_COMPONENT_DIR)
  .filter((file) => file.endsWith(".tsx") && !file.startsWith("index."))
  .sort()

// Tạo import statements
const imports = files.map((file) => {
  const name = toPascalCase(file) // e.g., BellFillActive
  return `import ${name} from './${file.replace(/\.tsx$/, "")}';`
})

// Tạo mapping object
const mappings = files.map((file) => {
  const name = toPascalCase(file)
  const key = file.replace(/\.tsx$/, "")
  return `  ${key}: ${name},`
})

// Kết hợp nội dung
const indexContent = `// ⚠️ Auto-generated — DO NOT EDIT

${imports.join("\n")}

export const SvgType = {
${mappings.join("\n")}
} as const;

export type ISvgType = keyof typeof SvgType;

export default SvgType;
`

fs.writeFileSync(OUT_FILE, indexContent, "utf8")
console.log(`✅ Generated ${files.length} SVG components into index.ts`)
