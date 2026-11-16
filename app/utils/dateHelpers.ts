import { format, parse } from "date-fns"

export const formatDob = (text: string) => {
  const clean = text.replace(/\D/g, "")
  if (clean.length === 0) return ""

  let formatted = clean
  if (clean.length > 2) {
    formatted = `${clean.slice(0, 2)}/${clean.slice(2)}`
  }
  if (clean.length > 4) {
    formatted = `${clean.slice(0, 2)}/${clean.slice(2, 4)}/${clean.slice(4, 8)}`
  }
  return formatted.slice(0, 10)
}

export const toFormDate = (dateStr?: string): string => {
  if (!dateStr) return ""
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split("-")
    return `${day}/${month}/${year}`
  }
  if (dateStr.includes("T")) {
    try {
      const date = new Date(dateStr)
      if (!isNaN(date.getTime())) {
        return format(date, "dd/MM/yyyy")
      }
    } catch (e) {
      console.log(e)
    }
  }
  return dateStr
}

export const toApiDate = (dateStr?: string): string => {
  if (!dateStr) return ""
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    const [day, month, year] = dateStr.split("/")
    return `${year}-${month}-${day}`
  }
  return dateStr
}

export const parseDate = (dateStr?: string): Date => {
  if (!dateStr) return new Date()
  try {
    const parsed = parse(dateStr, "dd/MM/yyyy", new Date())
    if (!isNaN(parsed.getTime())) {
      return parsed
    }
  } catch (error) {
    console.log(error)
    // Ignore error and fall back
  }
  try {
    const parsed = parse(dateStr, "yyyy-MM-dd", new Date())
    if (!isNaN(parsed.getTime())) {
      return parsed
    }
  } catch (error) {
    console.log(error)

    // Ignore error
  }
  return new Date()
}
